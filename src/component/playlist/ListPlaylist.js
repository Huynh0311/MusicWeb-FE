import React, {useEffect, useState} from "react";
import {getAllPlaylist, getAllPlaylistWithLikeQuantity} from "../api/PlaylistService/PlaylistService";
import {Link, useNavigate} from "react-router-dom";
import "./Playlist.css"
import {useSelector} from "react-redux";
import {likeClickAPI} from "../api/LikesService/LikesService";
import {playlistLikeClickAPI} from "../api/playlistLikesService/playlistLikesService";

export default function ListPlaylist() {
    const navigate = useNavigate();
    const accountLogin = useSelector(state => state.account)
    const [listPlaylist, setListPlaylist] = useState([]);
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("data")));
    const [playlistLikesQuantity, setPlaylistLikesQuantity] = useState(0);
    const [isLiked, setIsLiked] = useState();

    useEffect(() => {
        if (account != null) {
            getAllPlaylistWithLikeQuantity().then(res => {
                setListPlaylist(res.data);
            })
        }
    }, [playlistLikesQuantity,isLiked])

    const likeClick = (id) => {
        if (!accountLogin) {
            navigate("/login");
            return;
        }
        playlistLikeClickAPI(id).then(res => {
            setIsLiked(res.data)
        })
    }

    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../../images/banner/home.jpg"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1">
                                    <h3 className="mb-0">Top <span className="text-primary">Playlist</span></h3></div>
                                <a type="button" data-toggle="modal" data-target="#exampleModalCenter"
                                   className="btn btn-link">
                                    <i className="fa-sharp fa-light fa-list-music"></i>
                                    Tạo mới Playlist
                                </a>
                            </div>
                            <div className="list list--lg list--order">
                                <div className="row">
                                    {listPlaylist.map((item) => (
                                        <div className="list__item" key={item.id}>
                                            <a href="album-details.html"
                                                                       className="list__cover"
                                                                       style={{height: "150px", width: "150px"}}><img
                                            src={item.playlistImg} alt="Luna" style={{height: 200 + 'px'}}/></a>
                                            <div className="list__content">
                                                <Link
                                                    to={`/detailPlaylist/${item.id}`}
                                                    className="list__title text-truncate">{item.namePlaylist}</Link>
                                                <p className="list__subtitle text-truncate"><Link
                                                    to={`/detailPlaylist/${item.id}`}>
                                                </Link></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li>
                                                    <a role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="100">
                                                        {item.isLiked === 1 ? (
                                                            <i className="fa-sharp fa-solid fa-heart"
                                                               style={{
                                                                   color: "#ff0000",
                                                                   fontSize: "24px"
                                                               }}
                                                               onClick={() => likeClick(item.id)}>
                                                            </i>
                                                        ) : (
                                                            <i className="ri-heart-line heart-empty"
                                                               onClick={() => likeClick(item.id)}
                                                            />
                                                        )}
                                                    </a>
                                                </li>
                                                <p style={{marginLeft:"5px"}}>{item.likesQuantity}</p>
                                                <li className="dropstart d-inline-flex"><a
                                                    className="dropdown-link"
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-label="Cover options"
                                                    aria-expanded="false"><i
                                                    className="ri-more-fill"></i></a>
                                                    <ul className="dropdown-menu dropdown-menu-sm">
                                                        <li><a className="dropdown-item" href="#"
                                                               role="button"
                                                               data-favorite-id="100">Favorite</a></li>
                                                        <li><a className="dropdown-item"
                                                               href="audio/ringtone-1.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="#"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item"
                                                               href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Tạo Playlist mới</h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-playlist">
                                <p>Tên Playlist:</p>
                                <input placeholder={"Hãy nhập tên Playlist"}/>
                            </div>

                            <div className={"input-playlist"}>
                                <p>Nhập ảnh Playlist:</p>
                                <input type={"file"}/>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-dismiss="modal">Close
                            </button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}