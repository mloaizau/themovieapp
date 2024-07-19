import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconButton, Modal, Title } from 'react-native-paper';
import { MoviesController } from '../controllers/movies.controller';
import YoutubePlayer from 'react-native-youtube-iframe';

export const ModalVideo = (props: any) => {

    const { show, setShow, idMovie } = props;
    const { getMovieVideo } = MoviesController();

    const [video, setVideo] = useState(null);

    useEffect(() => {
        getMovieVideo(idMovie).then((response) => {
            console.log(response.results)
            let idVideo: any = null;
            response.results.forEach((video: any) => {
                if(video.site === "YouTube" && !idVideo) {
                    idVideo = video.key;
                }
            });
            console.log(idVideo);
            setVideo(idVideo);
        });
    }, [])

    if(!video) return null;

    return (
        <Modal visible={show} contentContainerStyle={styles.modal} >
            {/* <YoutubePlayer height={300} videoId={idMovie} webViewStyle={styles.video} /> */}
            <IconButton
                icon="close"
                onPress={() => setShow(false)}
                style={styles.close}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#000ffd",
        height: "120%",
        alignItems: "center"
    },
    close: {
        backgroundColor: "#1ea1f2",
        width: 50,
        height: 50,
        borderRadius: 100,
        position: "absolute",
        bottom: 100
    },
    video: {
        alignSelf: "stretch"
    }
})