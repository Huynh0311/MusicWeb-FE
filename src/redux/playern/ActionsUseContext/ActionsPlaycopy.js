import React, {useEffect, useRef} from 'react';
import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {useAudioPlayer} from "./AudioPlayerProvider";

const ActionsPlaycopy = () => {
        const {currentSong, songs, updateCurrentSongAndSongs, isPlaying, handlePlayToggle} = useAudioPlayer();
        const player = useRef();
        const handleNextSongClick = () => {
            console.log(songs);
            const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
            if (currentIndex < songs.length - 1) {
                const nextSong = songs[currentIndex + 1];
                updateCurrentSongAndSongs(nextSong, songs);
                console.log(nextSong);
            } else if (currentIndex === songs.length - 1) {
                const nextSong = songs[0];
                updateCurrentSongAndSongs(nextSong, songs);
                console.log(nextSong);
            } else {
                const defaultNextSong = songs[0];
                updateCurrentSongAndSongs(defaultNextSong, songs);
                console.log(defaultNextSong);
            }
        };

        const handlePreviousSongClick = () => {
            const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
            if (currentIndex > 0) {
                const previousSong = songs[currentIndex - 1];
                updateCurrentSongAndSongs(previousSong, songs);
                console.log(previousSong);
            } else if (currentIndex === 0) {
                const previousSong = songs[songs.length - 1];
                updateCurrentSongAndSongs(previousSong, songs);
                console.log(previousSong);
            }
        }
        const audiofunction = () => {
            isPlaying ? player.current.audio.current.play() : player.current.audio.current.pause();
        };

        useEffect(() => {
            audiofunction();
        }, [currentSong, isPlaying]);

        return (
            <div>
                <div id="player">
                    <div className="container" style={{maxWidth: "1200px"}}>
                        <div className="player-container">
                            <div className="cover d-flex align-items-center">
                                <div className="cover__image">
                                    <img data-amplitude-song-info="cover_art_url" src="../../images/cover/small/1.jpg"
                                         alt="" style={{height: "100%"}}/>
                                </div>
                                <div className="cover__content ps-3 d-none d-sm-block"><a href="song-details.html"
                                                                                          className="cover__title text-truncate"
                                                                                          data-amplitude-song-info="name">
                                    I love you mummy
                                </a>
                                    <a href="artist-details.html" className="cover__subtitle text-truncate"
                                       data-amplitude-song-info="artist">
                                        Arebica Luna
                                    </a>
                                </div>
                            </div>
                            <div className={"body-player player-control"}>
                                <H5AudioPlayer ref={player}
                                               src={currentSong && currentSong.pathSong}
                                               onPlay={() => handlePlayToggle(true)}
                                               onPause={() => handlePlayToggle(false)}
                                               preload={"metadata"}
                                               className={""}
                                               style={{height: "100%", boxShadow: "none",}}
                                />
                                <div className="prev_next">
                                    <BiSkipPrevious onClick={handlePreviousSongClick} className={"prev"}/>
                                    <BiSkipNext onClick={handleNextSongClick} className={"next"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default ActionsPlaycopy;