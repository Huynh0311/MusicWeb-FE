import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {getAllSongByGenresIDAPI, getSongByID, playSong} from "../../api/songService/SongService";
import {getSongLikeQuantityAPI, isLikedAPI, likeClickAPI} from "../../api/LikesService/LikesService";
import {getAllCommentBySongID, getAllCommentBySongIdAPI, sendCommentAPI} from "../../api/commentService/CommentService";

const DetailSong = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("data")));
    console.log(account)
    const [currentSong, setCurrentSong] = useState({
        genres: {}
    });
    const [songCreateDate, setSongCreateDate] = useState({
        day: '',
        month: '',
        year: '',
    })
    const [like, setLike] = useState({
        account: {},
        song: {}
    });
    const [isLiked, setIsLiked] = useState();
    const [play, setPlay] = useState();
    const [likedQuantity, setLikedQuantity] = useState();
    const [comment, setComment] = useState('');
    const [timeComment, setTimeComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const {id} = useParams();
    const [relatedSongs, setrelatedSongs] = useState([]);
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        getSongByID(id)
            .then(res => {
                setCurrentSong(res.data);
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
    }, [id])

    const checkLike = () => {
        if (like.account.name != null && like.song.nameSong != null) {
            isLikedAPI(like).then(res => {
                setIsLiked(res.data)
            })
        } else {
            console.log("Không có dữ liệu hợp lệ để gửi yêu cầu.");
        }
    }

    useEffect(() => {
        if (like.account && like.song) {
            checkLike();
        }
    }, [like.account, like.song]);

    const getLikeQuantity = () => {
        getSongLikeQuantityAPI(id).then(res => {
            if (res.data != null) {
                setLikedQuantity(res.data);
            }
        })
            .catch(error => {
                console.log(error);
            });
    }

    const getAllSongByGenres = () => {
        getAllSongByGenresIDAPI(id).then(res => {
            if (res.data != null) {
                setrelatedSongs(res.data);
            }
        })
    }

    const likeClick = () => {
        if (account !== null) {
            if (like.account != null && like.song != null) {
                likeClickAPI(like).then(res => {
                    setIsLiked(res.data)
                    getLikeQuantity();
                })
            } else {
                console.log("Không có dữ liệu hợp lệ để gửi yêu cầu.");
            }
        } else {
            navigate("/login")
        }
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


    if (currentSong.nameSong == null) {
    } else {
        document.querySelector('[data-amplitude-song-info="name"]').textContent = currentSong.nameSong;
        document.querySelector('[data-amplitude-song-info="artist"]').textContent = currentSong.nameSinger;
        document.querySelector('[data-amplitude-song-info="cover_art_url"]').setAttribute("src", currentSong.imgSong)
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
            // toast.error('Bạn cần đăng nhập trước khi bình luận!');
            navigate("/login")
        } else {
            sendCommentAPI(commentData).then(res => {
                getAllCommentBySongID(id)
            })
            setComment('');
        }

    }


    const getAllCommentBySongID = (id) => {
        getAllCommentBySongIdAPI(id).then(res => {
            setAllComments(res.data);
        })
    }

    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../../images/banner/song.jpg)"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="row" data-song-id={currentSong.id} data-song-name={currentSong.nameSong}
                                 data-song-artist={currentSong.nameSinger}
                                 data-song-album="Sadness" data-song-url={currentSong.pathSong}
                                 data-song-cover="images/cover/small/8.jpg">
                                <div className="col-xl-3 col-md-4">

                                    <div className="cover cover--round">
                                        <div className="cover__image"><img src={currentSong.imgSong}
                                                                           alt="Treasure face" style={{
                                            marginLeft: "30px",
                                            marginTop: "10px"
                                        }}/></div>
                                    </div>

                                </div>
                                <div className="col-1 d-none d-xl-block"></div>
                                <div className="col-md-8 mt-5 mt-md-0">
                                    <div className="d-flex flex-wrap mb-2"><span
                                        className="text-dark fs-4 fw-semi-bold pe-2">{currentSong && currentSong.nameSong}</span>
                                        <div className="dropstart d-inline-flex ms-auto"><a className="dropdown-link"
                                                                                            href="javascript:void(0);"
                                                                                            role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-label="Cover options"
                                                                                            aria-expanded="false"><i
                                            className="ri-more-fill"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-playlist-id="8">Add to playlist</a></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-queue-id="8">Add to queue</a></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-next-id="8">Next to play</a></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button">Share</a></li>
                                                <li className="dropdown-divider"></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-play-id="8">Play</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul className="info-list info-list--dotted mb-3">
                                        <li>Thể loại: {currentSong.genres.name}</li>
                                        <li>Đăng ngày: {
                                            songCreateDate.day + '-' + songCreateDate.month + '-' + songCreateDate.year}
                                        </li>
                                    </ul>
                                    <div className="mb-4"><p className="mb-2">Người đăng: <span
                                        className="text-dark fw-medium">{currentSong.accountName}</span></p>
                                        <p className="mb-2">Ca sỹ: <span className="text-dark fw-medium">
                                           {currentSong && currentSong.nameSinger}
                                            {currentSong.auth == true &&
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
                                                        data-play-id={currentSong.id} onClick={setIsPlaying}>
                                                    <i className="ri-play-fill icon-play"></i>
                                                    <i className="ri-pause-fill icon-pause"></i>
                                                </button>
                                                <span className="ps-2 fw-semi-bold">{play}</span></div>
                                        </li>
                                        <li>
                                            {isLiked == 1 ?
                                                (<a href="javascript:void(0);" role="button"
                                                    className="text-dark d-flex align-items-center"
                                                    aria-label="Favorite" data-favorite-id="1">
                                                    <i className="fa-sharp fa-solid fa-heart"
                                                       style={{color: "#ff0000", fontSize: "24px"}}
                                                       onClick={likeClick}>
                                                    </i>
                                                    <i className="ri-heart-fill heart-fill"></i>
                                                    <span
                                                        className="ps-2 fw-medium">{
                                                        likedQuantity != null ? likedQuantity : ''
                                                    }</span>
                                                </a>) :
                                                (<a href="javascript:void(0);" role="button"
                                                    className="text-dark d-flex align-items-center"
                                                    aria-label="Favorite" data-favorite-id="1"
                                                    onClick={likeClick}>
                                                    <i className="ri-heart-line heart-empty"></i>
                                                    <i className="ri-heart-fill heart-fill"></i> <span
                                                    className="ps-2 fw-medium">{
                                                    likedQuantity != null ? likedQuantity : ''
                                                }</span></a>)}

                                        </li>
                                        <li><a href="javascript:void(0);" role="button"
                                               className="text-dark d-flex align-items-center"
                                               aria-label="Download"><i className="ri-download-2-line"></i> <span
                                            className="ps-2 fw-medium">24</span></a></li>
                                        <li><span className="text-dark d-flex align-items-center"><i
                                            className="ri-star-fill text-warning"></i> <span
                                            className="ps-2 fw-medium">4.5</span></span></li>
                                    </ul>
                                    <div className="mt-2"><span
                                        className="d-block text-dark fs-6 fw-semi-bold mb-3">Mô tả</span>
                                        <p dangerouslySetInnerHTML={{__html: currentSong.description}}></p></div>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head"><h3 className="mb-0">Related <span
                                className="text-primary">Songs</span></h3></div>
                            <div className="swiper-carousel swiper-carousel-button">
                                <div className="swiper" data-swiper-slides="5" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        {relatedSongs.map((rs) => {
                                            return (
                                                <div className="swiper-slide" key={rs.id}>
                                                    <div className="cover cover--round" data-song-id={rs.id}
                                                         data-song-name={rs.nameSong}
                                                         data-song-artist="Arebica Luna" data-song-album="Mummy"
                                                         data-song-url={rs.pathSong}
                                                         data-song-cover={rs.pathSong}>
                                                        <div className="cover__head">
                                                            <ul className="cover__label d-flex">
                                                                <li><span className="badge rounded-pill bg-danger"><i
                                                                    className="ri-heart-fill"></i></span>
                                                                </li>
                                                            </ul>
                                                            <div
                                                                className="cover__options dropstart d-inline-flex ms-auto">
                                                                <a
                                                                    className="dropdown-link" href="javascript:void(0);"
                                                                    role="button"
                                                                    data-bs-toggle="dropdown" aria-label="Cover options"
                                                                    aria-expanded="false"><i
                                                                    className="ri-more-2-fill"></i></a>
                                                                <ul className="dropdown-menu dropdown-menu-sm">
                                                                    <li><a className="dropdown-item"
                                                                           href="javascript:void(0);"
                                                                           role="button"
                                                                           data-favorite-id="1">Favorite</a></li>
                                                                    <li><a className="dropdown-item"
                                                                           href="javascript:void(0);"
                                                                           role="button"
                                                                           data-playlist-id="1">Add to playlist</a></li>
                                                                    <li><a className="dropdown-item"
                                                                           href="javascript:void(0);"
                                                                           role="button"
                                                                           data-queue-id="1">Add to queue</a></li>
                                                                    <li><a className="dropdown-item"
                                                                           href="javascript:void(0);"
                                                                           role="button"
                                                                           data-next-id="1">Next to play</a></li>
                                                                    <li><a className="dropdown-item"
                                                                           href="javascript:void(0);"
                                                                           role="button">Share</a>
                                                                    </li>
                                                                    <li className="dropdown-divider"></li>
                                                                    <li><a className="dropdown-item"
                                                                           href="javascript:void(0);"
                                                                           role="button"
                                                                           data-play-id="1">Play</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="cover__image"><img src={rs.imgSong}
                                                                                           alt="I love you mummy"
                                                                                           style={{
                                                                                               width: "180px",
                                                                                               height: "180px"
                                                                                           }}/>
                                                            <button type="button"
                                                                    className="btn btn-play btn-default btn-icon rounded-pill"
                                                                    data-play-id={rs.id}><i
                                                                className="ri-play-fill icon-play"/> <i
                                                                className="ri-pause-fill icon-pause"/></button>
                                                        </div>

                                                        <div className="cover__foot" onClick={() => {navigate("/song/detailSong/" + rs.id)}}>
                                                            <p className="cover__title text-truncate">
                                                                {rs.nameSong}
                                                            </p>
                                                            <p className="cover__subtitle text-truncate">
                                                                {rs.nameSinger}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )})
                                        }
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
                                    {allComments.map((cm) => {
                                        return (
                                            <div className="avatar avatar--lg align-items-start" key={cm.id}>
                                                <div className="avatar__image"><img src={cm.account.img} alt="user"/>
                                                </div>
                                                <div className="avatar__content">
                                                    <span className="avatar__title mb-1">{cm.account.name}</span>
                                                    <span className="avatar__subtitle mb-2">{cm.timeComment}</span>
                                                    <div className="text-warning d-flex mb-1">
                                                        <i className="ri-star-s-fill"></i>
                                                        <i className="ri-star-s-fill"></i>
                                                        <i className="ri-star-s-fill"></i>
                                                        <i className="ri-star-s-fill"></i>
                                                    </div>
                                                    <p>{cm.content}</p><a href="javascript:void(0);"
                                                                          className="btn btn-link">
                                                        <div className="btn__wrap">
                                                            <i className="ri-reply-line fs-6"></i>
                                                            <span>Reply</span>
                                                        </div>
                                                    </a>
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