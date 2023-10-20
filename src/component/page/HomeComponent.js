import React, {useEffect, useState} from 'react';
import SongList from "../player/SongList";
import TopSong from "../player/TopSong";
import accountService from "../api/AccountService/AccountService";
import TopPlaylist from "../playlist/TopPlaylist";


const HomeComponent = () => {
    const [listAuthAccount, setListAuthAccount] = useState([]);
    useEffect(() => {
        accountService.getAllAccountByAuth().then(res => {
            setListAuthAccount(res.data);
        })
    }, [])

    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../../images/banner/home.jpg"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span
                                    className="section__subtitle"></span>
                                    <h3 className="mb-0">Song <span className="text-primary">List</span></h3></div>
                                <a href="songs.html" className="btn btn-link">View All</a></div>
                            <div className="swiper-carousel swiper-carousel-button"
                                 style={{display: 'flex', flexWrap: 'nowrap'}}>
                                <SongList/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="section col-xl-6">
                                <div className="section__head">
                                    <div className="flex-grow-1"><h3 className="mb-0">Sự kiện <span
                                        className="text-primary">sắp diễn ra</span></h3>
                                    </div>
                                </div>
                                <div className="swiper-carousel">
                                    <div className="swiper" data-swiper-slides="2" data-swiper-autoplay="true">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="cover cover--round"><a href="event-details.html"
                                                                                       className="cover__image"><img
                                                    src="https://static.wixstatic.com/media/c1b317_793a917279554fe693ccd9c06c294cb8~mv2.webp"
                                                    alt="Event cover"/></a>
                                                    <div className="cover__foot mt-3 px-2"><p
                                                        className="cover__subtitle d-flex mb-2"><i
                                                        className="ri-map-pin-fill fs-6"></i> <span
                                                        className="ms-1 fw-semi-bold">26 Chương Dương,TP.HCM</span>
                                                    </p><a href="event-details.html" className="cover__title fs-6 mb-3">Clear
                                                        Watera Festival</a>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-group">
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-3.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-4.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-5.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ps-1">24+</div>
                                                            </div>
                                                            <a href="https://ongvove.com/news/5-su-kien-am-nhac-sap-dien-ra-tai-tphcm-2023"
                                                               className="btn btn-sm btn-light-primary">Tham gia
                                                                ngay</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="cover cover--round"><a href="event-details.html"
                                                                                       className="cover__image"><img
                                                    src="https://ongvove.com/uploads/0000/42/2023/08/08/8wonder.jpg"
                                                    alt="Event cover"/></a>
                                                    <div className="cover__foot mt-3 px-2"><p
                                                        className="cover__subtitle d-flex mb-2"><i
                                                        className="ri-map-pin-fill fs-6"></i> <span
                                                        className="ms-1 fw-semi-bold">ViWonders Nha Trang</span>
                                                    </p>
                                                        <a href="https://ongvove.com/news/5-su-kien-am-nhac-sap-dien-ra-tai-tphcm-2023"
                                                           className="cover__title fs-6 mb-3">
                                                            Music Festival 8Wonder
                                                        </a>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-group">
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb.jpg"
                                                                            alt=""/></div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-2.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-3.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ps-1">100+</div>
                                                            </div>
                                                            <a href="event-details.html"
                                                               className="btn btn-sm btn-light-primary">Tham gia
                                                                ngay</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="cover cover--round"><a href="event-details.html"
                                                                                       className="cover__image"><img
                                                    src="https://ongvove.com/uploads/0000/42/2023/08/08/ntpmm.jpg"
                                                    alt="Event cover"/></a>
                                                    <div className="cover__foot mt-3 px-2"><p
                                                        className="cover__subtitle d-flex mb-2"><i
                                                        className="ri-map-pin-fill fs-6"></i> <span
                                                        className="ms-1 fw-semi-bold">Công viên Yên Sở, Hoàng Mai, Hà Nội</span>
                                                    </p><a
                                                        href="https://ongvove.com/news/5-su-kien-am-nhac-sap-dien-ra-tai-tphcm-2023"
                                                        className="cover__title fs-6 mb-3">Những thành phố mơ màng</a>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-group">
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb.jpg"
                                                                            alt=""/></div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-2.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-3.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ps-1">40+</div>
                                                            </div>
                                                            <a href="https://ongvove.com/news/5-su-kien-am-nhac-sap-dien-ra-tai-tphcm-2023"
                                                               className="btn btn-sm btn-light-primary">Tham gia
                                                                ngay</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-pagination"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-1"></div>
                            <div className="section col-xl-5">
                                <div className="mat-tabs">
                                    <ul className="nav nav-tabs" id="songs_list" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="trending" data-bs-toggle="tab"
                                                    data-bs-target="#trending_pane" type="button" role="tab"
                                                    aria-controls="trending_pane" aria-selected="true">Trending
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content mt-4" id="songs_list_content">
                                    <div className="tab-pane fade show active" id="trending_pane" role="tabpanel"
                                         aria-labelledby="trending" tabIndex="0">
                                        <TopSong/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span
                                    className="section__subtitle">Những nghệ sỹ mới</span>
                                    <h3 className="mb-0">Nổi <span className="text-primary">bật</span></h3>
                                </div>
                                {/*<a href="artists.html" className="btn btn-link">View All</a>*/}
                            </div>
                            <div className="swiper-carousel swiper-carousel-button">
                                <div className="swiper" data-swiper-slides="6" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        {listAuthAccount && listAuthAccount.map((account) => (
                                            <div className="swiper-slide">
                                                <div className="avatar avatar--xxl d-block text-center">
                                                    <div className="avatar__image">
                                                        <div>
                                                            <img src={account.img} alt="Arebica Luna"/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="avatar__title mt-3">{account.name}
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        </div>
                        <TopPlaylist/>
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span className="section__subtitle">Listen live now</span>
                                    <h3 className="mb-0">Live <span className="text-primary">Radios</span></h3></div>
                                <a href="stations.html" className="btn btn-link">View All</a></div>
                            <div className="swiper-carousel swiper-carousel-button">
                                <div className="swiper" data-swiper-slides="5" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="1"
                                                 data-song-name="I love you mummy"
                                                 data-song-artist="Arebica Luna" data-song-album="Mummy"
                                                 data-song-url="audio/ringtone-1.mp3"
                                                 data-song-cover="images/cover/small/1.jpg">
                                                <div className="cover__head">
                                                    <ul className="cover__label d-flex">
                                                        <li><span className="badge rounded-pill bg-danger"><i
                                                            className="ri-heart-fill"></i></span>
                                                        </li>
                                                    </ul>
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="#"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-favorite-id="1">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-queue-id="1">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-next-id="1">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-play-id="1">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/1.jpg"
                                                                                   alt="International"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="1"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="#" role="button"
                                                                                className="cover__title text-truncate">International</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="2"
                                                 data-song-name="Shack your butty"
                                                 data-song-artist="Gerrina Linda" data-song-album="Hot shot"
                                                 data-song-url="audio/ringtone-2.mp3"
                                                 data-song-cover="images/cover/small/2.jpg">
                                                <div className="cover__head">
                                                    <ul className="cover__label d-flex">
                                                        <li><span className="badge rounded-pill bg-info"><i
                                                            className="ri-vip-crown-fill"></i></span></li>
                                                    </ul>
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="#"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-favorite-id="2">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-queue-id="2">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-next-id="2">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-play-id="2">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/2.jpg"
                                                                                   alt="Network"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="2"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="#" role="button"
                                                                                className="cover__title text-truncate">Network</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="3"
                                                 data-song-name="Do it your way(Female)"
                                                 data-song-artist="Zunira Willy & Nutty Nina" data-song-album="Own way"
                                                 data-song-url="audio/ringtone-3.mp3"
                                                 data-song-cover="images/cover/small/3.jpg">
                                                <div className="cover__head">
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="#"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-favorite-id="3">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-queue-id="3">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-next-id="3">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-play-id="3">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/3.jpg"
                                                                                   alt="Alpha Gamma"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="3"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="#" role="button"
                                                                                className="cover__title text-truncate">Alpha
                                                    Gamma</a></div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="4"
                                                 data-song-name="Say yes"
                                                 data-song-artist="Johnny Marro" data-song-album="Say yes"
                                                 data-song-url="audio/ringtone-4.mp3"
                                                 data-song-cover="images/cover/small/4.jpg">
                                                <div className="cover__head">
                                                    <ul className="cover__label d-flex">
                                                        <li><span className="badge rounded-pill bg-danger"><i
                                                            className="ri-heart-fill"></i></span>
                                                        </li>
                                                        <li><span className="badge rounded-pill bg-info"><i
                                                            className="ri-vip-crown-fill"></i></span></li>
                                                    </ul>
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="#"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-favorite-id="4">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-queue-id="4">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-next-id="4">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-play-id="4">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/4.jpg"
                                                                                   alt="Leanne Hutton"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="4"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="#" role="button"
                                                                                className="cover__title text-truncate">Leanne
                                                    Hutton</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="5"
                                                 data-song-name="Where is your letter"
                                                 data-song-artist="Jina Moore & Lenisa Gory" data-song-album="Letter"
                                                 data-song-url="audio/ringtone-5.mp3"
                                                 data-song-cover="images/cover/small/5.jpg">
                                                <div className="cover__head">
                                                    <ul className="cover__label d-flex">
                                                        <li><span className="badge rounded-pill bg-info"><i
                                                            className="ri-vip-crown-fill"></i></span></li>
                                                    </ul>
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="#"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-favorite-id="5">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-queue-id="5">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-next-id="5">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-play-id="5">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/5.jpg"
                                                                                   alt="K S N F"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="5"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="#" role="button"
                                                                                className="cover__title text-truncate">K
                                                    S N F</a></div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="6"
                                                 data-song-name="Hey not me"
                                                 data-song-artist="Rasomi Pelina" data-song-album="Find soul"
                                                 data-song-url="audio/ringtone-6.mp3"
                                                 data-song-cover="images/cover/small/6.jpg">
                                                <div className="cover__head">
                                                    <ul className="cover__label d-flex">
                                                        <li><span className="badge rounded-pill bg-info"><i
                                                            className="ri-vip-crown-fill"></i></span></li>
                                                    </ul>
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="#"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-favorite-id="6">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-queue-id="6">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-next-id="6">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="#"
                                                                   role="button"
                                                                   data-play-id="6">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/6.jpg"
                                                                                   alt="Clay Gandy"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="6"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="#" role="button"
                                                                                className="cover__title text-truncate">Clay
                                                    Gandy</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer id="footer">
                        <div className="container">
                            <div className="text-center mb-4"><a href="mailto:info@listenapp.com"
                                                                 className="display-5 email">info@listenapp.com</a>
                            </div>
                            <div className="app-btn-group pt-2"><a href="#" className="btn btn-lg btn-primary">
                                <div className="btn__wrap"><i className="ri-google-play-fill"></i> <span
                                    className="ms-2">Google Play</span>
                                </div>
                            </a><a href="#" className="btn btn-lg btn-primary">
                                <div className="btn__wrap"><i className="ri-app-store-fill"></i> <span className="ms-2">App Store</span>
                                </div>
                            </a></div>
                        </div>
                    </footer>
                </main>
            </div>
            <div id="backdrop"></div>
        </div>
    );
};

export default HomeComponent;