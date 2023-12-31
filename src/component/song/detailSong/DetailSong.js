import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    getAllSongByGenresIDAPI,
    getSongByID,
    isSongOwnedByLoggedInAccount,
    playSong, removeCommentInASongByCommentID
} from "../../api/songService/SongService";
import {findAccountBySong} from "../../api/songService/SongService";
import {getSongLikeQuantityAPI, isLikedAPI, likeClickAPI} from "../../api/LikesService/LikesService";
import {getAllCommentBySongIdAPI, sendCommentAPI} from "../../api/commentService/CommentService";
import {AiOutlinePauseCircle, AiOutlinePlayCircle} from "react-icons/ai";
import {AudioPlayerContext, useAudioPlayer} from "../../../redux/playern/ActionsUseContext/AudioPlayerProvider";
import {useContext} from "react";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {ImCross} from "react-icons/im";
import {toast} from "react-toastify";
import {WebSocketContext} from "../../WebSocketProvider";
import {saveNotify} from "../../api/NotifyService/NotifyService";


const DetailSong = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("data")));
    const [receiver, setReceiver] = useState({});
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {isPlaying, handlePlayToggle, updateAllCurrentComments, allCurrentComments} = useContext(AudioPlayerContext);
    const [songs, setSongs] = useState([]);
    const [currentSongDT, setCurrentSongDT] = useState({
        genres: {}
    });
    const [songCreateDate, setSongCreateDate] = useState({day: '', month: '', year: '',})
    const [like, setLike] = useState({
        account: {},
        song: {}
    });
    const [isLiked, setIsLiked] = useState();
    const [play, setPlay] = useState();
    const [likedQuantity, setLikedQuantity] = useState();
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const {id} = useParams();
    const [relatedSongs, setrelatedSongs] = useState([]);
    const [status, setStatus] = useState(true);
    localStorage.setItem("status", status)
    const [isPlay, setIsPlay] = useState(false);
    const [detailSong, setDetailSong] = useState({genres: {}});
    const [currentDetailSong, setCurrentDetailSong] = useState();
    const [relateSongIsPlaying, setRelateSongIsPlaying] = useState(false);
    const {sendNotify} = useContext(WebSocketContext);

    const [ownedSong, setOwnedSong] = useState(false);
    const [removedComment, setRemovedComment] = useState(false);

    useEffect(() => {
        getSongByID(id)
            .then(res => {
                if (currentDetailSong == null) {
                    setCurrentSongDT({...res.data, isPlaying: false});
                } else if (relateSongIsPlaying) {
                    setCurrentSongDT({...res.data, isPlaying: false});
                } else {
                    setCurrentSongDT({...res.data, isPlaying: isPlaying});
                    console.log(currentSongDT)
                }
                getSongCreatedDate(res.data.timeCreate)
                setPlay(res.data.plays)
                setLike({
                    account: account,
                    song: res.data
                });
            })
            .catch(error => {
                console.log(error);
            })
        getLikeQuantity();
        getAllCommentBySongID(id)
        getAllSongByGenres();
        isSongOwnedByLoggedInAccount(id).then(res => setOwnedSong(res.data));
    }, [isPlaying, currentDetailSong, updateCurrentSongAndSongs, removedComment, allCurrentComments])

    const handleDetailSongClick = (song) => {
        setRelateSongIsPlaying(false);
        const newIsPlaying = !song.isPlaying;
        song.isPlaying = newIsPlaying;
        if (newIsPlaying) {
            handlePlayToggle(true);
        } else {
            handlePlayToggle(false);
        }
        setCurrentSongDT({...song});
        updateCurrentSongAndSongs(currentSongDT, songs);
        setCurrentDetailSong({...song})
        setIsPlaying();
    };


    const handleToggleRelatedSongClick = (relatedSong) => {
        setRelateSongIsPlaying(true);
        const updatedSongs = relatedSongs.map((song) => {
            const newIsPlaying = song.id === relatedSong.id ? !song.isPlaying : false;
            return {
                ...song,
                isPlaying: newIsPlaying,
            }
        });
        setSongs(updatedSongs);
        handlePlayToggle(updatedSongs.some((song) => song.isPlaying));
        updateCurrentSongAndSongs(relatedSong, songs);
    };

    const checkLike = () => {
        if (account == null) {
            setIsLiked(false);
        } else {
            if (like.account.name != null || like.song.nameSong != null) {
                isLikedAPI(like).then(res => {
                    setIsLiked(res.data)

                })
            }
        }
    }

    useEffect(() => {
        checkLike();
    }, [like.account, like.song]);

    useEffect(() => {
        findAccountBySong(id).then(res => {
            console.log(res.data)
            setReceiver(res.data)
        })
    }, []);

    const getLikeQuantity = () => {
        getSongLikeQuantityAPI(id).then(res => {
            setLikedQuantity(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const getAllSongByGenres = () => {
        getAllSongByGenresIDAPI(id).then(res => {
            const songs = res.data?.map((song) => ({
                ...song,
                isPlaying: currentSong && currentSong.id === song.id ? isPlaying : false,
            }));
            setrelatedSongs(songs);
        })
    }

    const likeClick = () => {
        if (!account) {
            navigate("/login");
            return;
        }
        if (!like.account && !like.song) {
            console.log("Không có dữ liệu hợp lệ để gửi yêu cầu.")
            return;
        }
        likeClickAPI(id).then(res => {
            setIsLiked(res.data)
            getLikeQuantity();
            if (account.id !== receiver.id) {
                if (isLiked === 0) {
                    if (localStorage.getItem("status") === "true") {
                        handleSendNotifyLike()
                        setStatus(false)
                        localStorage.setItem("status", `${status}`)
                    }
                }
            }
        })
    }
    const handleSendNotifyLike = () => {
        const data = {
            sender: account,
            receiver: {id: receiver.id},
            message: `${account.name} đã thích 1 bài hát của bạn`,
            navigate: '/song/detailSong/' + id
        }
        saveNotify(data).then(response => {
            sendNotify(response.data);
        }).catch(error => {
            console.log(error)
        })
    }
    const handleSendNotifyComment = () => {
        const data = {
            sender: account,
            receiver: {id: receiver.id},
            message: `${account.name} đã bình luận 1 bài hát của bạn`,
            navigate: '/song/detailSong/' + id
        }
        saveNotify(data).then(response => {
            sendNotify(response.data);
        }).catch(error => {
            console.log(error)
        })
    }


    const getSongCreatedDate = (songCreateDate) => {
        let date = new Date(songCreateDate);
        const songDateCreateObj = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
        if ((songDateCreateObj.day) < 10) songDateCreateObj.day = '0' + songDateCreateObj.day;
        setSongCreateDate(songDateCreateObj);
    }

    const setIsPlaying = () => {
        setIsPlay((prevState) => {
            const newIsPlayState = !prevState;
            played(newIsPlayState);
            return newIsPlayState;
        });
    };

    const played = async (isPlaying) => {
        if (isPlaying) {
            const res = await playSong(id)
            setPlay(res.data)
        }
    }

    const handleInputComment = (e) => {
        setComment(e.target.value);
    }


    const handleSubmitComment = (e) => {
        e.preventDefault();
        const commentData = {
            account: like.account,
            song: like.song,
            content: comment
        }
        if (account == null) {
            navigate("/login")
        } else {
            sendCommentAPI(commentData).then(res => {
                getAllCommentBySongID(id)
            })
            setComment('');
            handleSendNotifyComment();
        }

    }

    const getAllCommentBySongID = (id) => {
        getAllCommentBySongIdAPI(id).then(res => updateAllCurrentComments(res.data))
    }


    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../../images/banner/song.jpg)"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="row" data-song-id={currentSongDT.id} data-song-name={currentSongDT.nameSong}
                                 data-song-artist={currentSongDT.nameSinger}
                                 data-song-album="Sadness" data-song-url={currentSongDT.pathSong}
                                 data-song-cover={currentSongDT.imgSong}>
                                <div className="col-xl-3 col-md-4">
                                    <div className="cover cover--round">
                                        <div className="cover__image">
                                            <img src={currentSongDT.imgSong} alt="Treasure face"
                                                 style={{marginLeft: "30px", marginTop: "10px"}}/></div>
                                    </div>
                                </div>
                                <div className="col-1 d-none d-xl-block"></div>
                                <div className="col-md-8 mt-5 mt-md-0">
                                    <div className="d-flex flex-wrap mb-2"><span
                                        className="text-dark fs-4 fw-semi-bold pe-2">{currentSongDT && currentSongDT.nameSong}</span>
                                        <div className="dropstart d-inline-flex ms-auto">
                                            <div className="dropdown-link"
                                                 role="button"
                                                 data-bs-toggle="dropdown"
                                                 aria-label="Cover options"
                                                 aria-expanded="false"><i
                                                className="ri-more-fill"></i></div>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li>
                                                    <div className="dropdown-item"
                                                         role="button"
                                                    >Thêm vào danh sách phát
                                                    </div>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <div className="dropdown-item"
                                                         role="button"
                                                    >Phát
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul className="info-list info-list--dotted mb-3">
                                        <li>Thể loại: {currentSongDT.genres.name}</li>
                                        <li>Đăng ngày: {
                                            songCreateDate.day + '-' + songCreateDate.month + '-' + songCreateDate.year}
                                        </li>
                                    </ul>
                                    <div className="mb-4"><p className="mb-2">Người đăng: <span
                                        className="text-dark fw-medium">{currentSongDT.accountName}</span></p>
                                        <p className="mb-2">Ca sỹ: <span className="text-dark fw-medium">
                                           {currentSongDT && currentSongDT.nameSinger}
                                            {currentSongDT.auth === true &&
                                                <i className="fa-sharp fa-solid fa-circle-check"
                                                   style={{color: "#005eff", marginLeft: "5px"}}></i>
                                            }
                                        </span>
                                        </p>
                                    </div>
                                    <ul className="info-list mb-5">
                                        <li>
                                            <div className="d-flex align-items-center">
                                                <button type="button"
                                                        className="btn btn-play btn-default btn-icon rounded-pill playing"
                                                        data-play-id="">
                                                    {currentSongDT.isPlaying ? (
                                                        <BsPauseFill
                                                            onClick={() => handleDetailSongClick(currentSongDT)}
                                                            style={{fontSize: '30px'}}
                                                        />
                                                    ) : (
                                                        <BsFillPlayFill
                                                            onClick={() => handleDetailSongClick(currentSongDT)}
                                                            style={{fontSize: '30px'}}
                                                        />
                                                    )
                                                    }
                                                </button>
                                                <span className="ps-2 fw-semi-bold">{play}</span></div>
                                        </li>
                                        <li>
                                            {isLiked === 1 ?
                                                (<div role="button"
                                                      className="text-dark d-flex align-items-center"
                                                      aria-label="Favorite">
                                                        <i className="fa-sharp fa-solid fa-heart"
                                                           style={{color: "#ff0000", fontSize: "24px"}}
                                                           onClick={likeClick}>
                                                        </i>
                                                        <span
                                                            className="ps-2 fw-medium">{
                                                            likedQuantity != null ? likedQuantity : ''
                                                        }
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div role="button"
                                                         className="text-dark d-flex align-items-center"
                                                         aria-label="Favorite" data-favorite-id="1"
                                                         onClick={likeClick}>
                                                        <i className="ri-heart-line heart-empty"></i>
                                                        <span
                                                            className="ps-2 fw-medium">{
                                                            likedQuantity != null ? likedQuantity : ''
                                                        }</span></div>)
                                            }
                                        </li>
                                        <li>
                                            <div role="button"
                                                 className="text-dark d-flex align-items-center"
                                                 aria-label="Download"><i className="ri-download-2-line"></i> <span
                                                className="ps-2 fw-medium">24</span></div>
                                        </li>
                                        {/*<li><span className="text-dark d-flex align-items-center"><i*/}
                                        {/*    className="ri-star-fill text-warning"></i> <span*/}
                                        {/*    className="ps-2 fw-medium">4.5</span></span></li>*/}
                                    </ul>
                                    <div className="mt-2"><span
                                        className="d-block text-dark fs-6 fw-semi-bold mb-3">Mô tả</span>
                                        <p dangerouslySetInnerHTML={{__html: currentSongDT.description}}></p></div>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head"><h3 className="mb-0">Các bài hát <span
                                className="text-primary">Liên quan</span></h3></div>
                            <div className="swiper-carousel swiper-carousel-button">
                                <div className="swiper" data-swiper-slides="5" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        {relatedSongs.map((rs) => (
                                            <div className="swiper-slide" key={rs.id}>
                                                <div className="cover cover--round">
                                                    <div className="cover__head">
                                                        <ul className="cover__label d-flex">
                                                            <li><span className="badge rounded-pill bg-danger"></span>
                                                            </li>
                                                        </ul>
                                                        <div
                                                            className="cover__options dropstart d-inline-flex ms-auto">
                                                            <div
                                                                className="dropdown-link"
                                                                role="button"
                                                                data-bs-toggle="dropdown" aria-label="Cover options"
                                                                aria-expanded="false"><i
                                                                className="ri-more-2-fill"></i>
                                                            </div>
                                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                                <li>
                                                                    <div className="dropdown-item"
                                                                         role="button"
                                                                         data-playlist-id="1">
                                                                        Thêm vào danh sách phát
                                                                    </div>
                                                                </li>
                                                                <li className="dropdown-divider"></li>
                                                                <li>
                                                                    <div className="dropdown-item"
                                                                         role="button">
                                                                        Phát
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="cover__image"><img src={rs.imgSong}
                                                                                       alt={rs.nameSong}/>
                                                        <button type="button"
                                                                className="btn btn-play btn-default btn-icon rounded-pill">
                                                            {rs.isPlaying ? (
                                                                <BsPauseFill
                                                                    onClick={() => {
                                                                        handleToggleRelatedSongClick(rs);
                                                                    }}
                                                                    style={{fontSize: "30px"}}
                                                                />
                                                            ) : (
                                                                <BsFillPlayFill
                                                                    onClick={() => {
                                                                        handleToggleRelatedSongClick(rs);
                                                                    }}
                                                                    style={{fontSize: "30px"}}
                                                                />
                                                            )}
                                                        </button>
                                                    </div>
                                                    <div className="cover__foot">
                                                        <Link to={"/song/detailSong/" + rs.id}>
                                                            <div
                                                                className="cover__title text-truncate">{rs.nameSong}
                                                            </div>
                                                            <p className="cover__subtitle text-truncate">
                                                                {rs.nameSinger}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                </div>


                                            </div>

                                        ))}
                                    </div>
                                </div>
                                <div className="swiper-button-prev btn-default rounded-pill"></div>
                                <div className="swiper-button-next btn-default rounded-pill"></div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head"><h3 className="mb-0">Bình luận:</h3></div>
                            <div className="row">
                                <div className="col-xl-8">
                                    <form action="#" className="row mb-5">
                                        <div className="col-12 mb-4"><textarea name="comment" id="comment" cols="30"
                                                                               rows="4"
                                                                               className="form-control"
                                                                               value={comment}
                                                                               placeholder="Hãy để lại bình luận cho bài hát"
                                                                               onChange={handleInputComment}></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button type="button" className="btn btn-primary"
                                                    style={{minWidth: "160px"}} onClick={handleSubmitComment}>Submit
                                            </button>
                                        </div>
                                    </form>
                                    {allCurrentComments.map((cm) => {
                                        return (
                                            <div className="avatar avatar--lg align-items-start" key={cm.id}>
                                                <div className="avatar__image"><img src={cm.account.img} alt="user"/>
                                                </div>
                                                <div className="avatar__content"><span
                                                    className="avatar__title mb-1">{cm.account.name}</span>
                                                    <span
                                                        className="avatar__subtitle mb-2">{cm.timeComment}</span>
                                                    <p>{cm.content}</p>
                                                    <div className="btn btn-link">

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className="col-xl-4"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    );
}
export default DetailSong;