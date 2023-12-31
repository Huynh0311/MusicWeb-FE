import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";


const NavbarComponent = () => {
    const [account, setAccount] = useState(localStorage.getItem("data"));
    const loggedIn = isLoggedIn();
    const navigate = useNavigate();

    function isLoggedIn() {
        return account ? true : false;
    }

    const handleNavbar = (link_to) => {
        const on_active = document.querySelector(`a.nav-link.active`)
        on_active.classList.remove('active')
        const new_active = document.querySelector(`a.nav-link[href="${link_to}"]`)
        new_active.classList.add('active')
    }

    return (
        <div>
            <aside id="sidebar">
                <div className="sidebar-head d-flex align-items-center justify-content-between">
                    <Link to={"/"}>
                        <div className="brand external">
                            <img src="../../images/logos/logo.svg" alt="Listen app"/>
                        </div>
                    </Link>
                    <div role="button" className="sidebar-toggler" aria-label="Sidebar toggler">
                        <div className="d-none d-lg-block"><i className="ri-menu-3-line sidebar-menu-1"></i>
                            <i className="ri-menu-line sidebar-menu-2"></i>
                        </div>
                        <i className="ri-menu-fold-line d-lg-none"></i>
                    </div>
                </div>
                <div className="sidebar-body" data-scroll="true">
                    <nav className="navbar d-block p-0">
                        <ul className="navbar-nav">
                            <li className="nav-item nav-item-color">
                                <Link to={"/"} className="nav-link d-flex align-items-center active"
                                      onClick={event => handleNavbar('/')}
                                >
                                    <i className="ri-home-4-line fs-5"></i>
                                    <span className="ps-3">Trang chủ</span>
                                </Link>
                            </li>
                            <li className="nav-item nav-item-color"><a href="analytics.html"
                                                                       className="nav-link d-flex align-items-center"><i
                                className="ri-pie-chart-line fs-5"></i> <span className="ps-3">Thịnh hành</span></a>
                            </li>
                            <li className="nav-item nav-item-color">
                                <Link to={"/song/newSongList"} className="nav-link d-flex align-items-center"
                                      onClick={event => handleNavbar('/song/newSongList')}>
                                    <i className="ri-music-2-line"></i>
                                    <span className="ps-3">Bài hát mới</span>
                                </Link>
                            </li>
                            <li className="nav-item nav-item-color"><a href="genres.html"
                                                                       className="nav-link d-flex align-items-center"><i
                                className="ri-disc-line fs-5"></i> <span className="ps-3">Thể loại</span></a></li>


                            <li className="nav-item nav-item-color"><a href="artists.html"
                                                                       className="nav-link d-flex align-items-center"><i
                                className="ri-mic-line fs-5"></i> <span className="ps-3">Ca sĩ</span></a></li>
                            <li className="nav-item nav-item-color nav-item nav-item-color--head"><span
                                className="nav-item nav-item-color--head__text"
                                style={{marginLeft: "5px"}}>Bài hát</span></li>
                            {loggedIn ? (
                                <>
                                    <li className="nav-item nav-item-color">
                                        <Link to={'/listPlaylist'}
                                              className="nav-link d-flex align-items-center"
                                              onClick={event => handleNavbar('/listPlaylist')}
                                        >
                                            <i className="ri-album-line fs-5"></i>
                                            <span className="ps-3">Danh sách phát</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item nav-item-color">
                                        <Link to={"/favorite"} className="nav-link d-flex align-items-center"
                                              onClick={event => handleNavbar('/favorite')}
                                        >
                                            <i className="ri-heart-line fs-5"></i>
                                            <span className="ps-3">Yêu thích</span>

                                        </Link>
                                    </li>
                                    <li className="nav-item nav-item-color">
                                        <Link to={"/song"}
                                              className="nav-link d-flex align-items-center"
                                              onClick={event => handleNavbar('/song')}
                                        >
                                            <i className="fa-solid fa-list-music" style={{fontSize: "20px"}}></i>
                                            <span className="ps-3">Danh sách bài hát đã tạo</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item nav-item-color">
                                    <div className="login-nav-container login mar-t-15">
                                        <div className="text">Đăng nhập để khám phá playlist dành riêng cho bạn</div>
                                        <Link to={"/login"}>
                                            <button className="zm-btn is-medium is-outlined is-upper button"
                                                    tabIndex="0">
                                                <span>Đăng Nhập</span>
                                            </button>
                                        </Link>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                {loggedIn ? (
                    <div className="sidebar-foot">
                        <Link to={"/song/create"}>
                            <div className="btn btn-primary d-flex">
                                <div className="btn__wrap"><i className="ri-music-fill"></i> <span>Tạo bài hát</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                ) : (
                    <></>
                )
                }
            </aside>
        </div>
    )
        ;
};

export default NavbarComponent;
