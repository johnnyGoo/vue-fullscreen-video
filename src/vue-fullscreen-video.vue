<template>
    <div ref="parent" style="width: 100%;height: 100%;overflow: hidden">
        <video ref="video" playsinline :src="url" x5-video-player-type="h5"
        x5-video-player-fullscreen="true" preload="auto"  >

        </video>

    </div>
</template>
<style>
    .IIV::-webkit-media-controls-play-button,
    .IIV::-webkit-media-controls-start-playback-button {
        opacity: 0;
        pointer-events: none;
        width: 5px;
    }
</style>


/*!
* vue-keyframe-animation v0.0.1 (https://github.com/johnnyGoo/vue-movieclip)
* Author: Johnny chen
*
* Copyright 2013-2016 Johnny chen
*/
<script>

    // 注册
    export default {
        name: 'vue-fullscreen-video',
        // 声明 props
        props: {
            url: {
                type: String,
                default: ''
            },
            align: {
                type: String,
                default: 'crop'
            },
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            scroll: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                playing: false, video: null, parent: null
            }
        },
        methods: {
            play: function (url) {
                this.playing = true;
                this.$refs.video.play();
                this.$emit('play', this);

            },
            stop: function () {
                this.playing = false;
                this.$emit('stop', this);
            },
            updateSize: function () {
                let width = this.parent.clientWidth;
                let height = this.parent.clientHeight;
                let radio = width / height;
                let cut_w = this.video.videoWidth;
                let cut_h = this.video.videoHeight;
                let radio2 = cut_w / cut_h;
                let end_w, end_h;

                switch (this.align) {
                    case 'crop':
                        if (radio2 > radio) {
                            end_h = height;
                            end_w = end_h * radio2;
                        } else {
                            end_w = width;
                            end_h = end_w / radio2;
                        }
                        break;
                    case 'center':
                        if (radio2 > radio) {
                            end_w = width;
                            end_h = end_w / radio2;

                        } else {
                            end_h = height;
                            end_w = end_h * radio2;
                        }
                        break;
                }

                this.video.width = end_w;
                this.video.height = end_h;
                this.video.style.marginLeft = -(end_w - width) / 2 + 'px';
                this.video.style.marginTop = -(end_h - height) / 2 + 'px';
            }
        },


        mounted: function () {
            let self = this;
            this.parent = this.$refs.parent;
            this.video = this.$refs.video;
            //console.log(this.$refs.video)
            this.video.oncanplay = function () {
                self.$emit('canplay');
                self.updateSize();
            };
            window.onresize = function () {
                self.updateSize();
            };
            if (false===this.scroll) {
                this.parent.setAttribute('ontouchmove', 'event.preventDefault();');
            }

            // this.enableInlineVideo(this.$refs.video)
            //  this.updateFrame(this.frame);
            if (this.autoPlay) {
                this.play()
            }


        }


    }


</script>