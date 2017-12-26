<template>
    <div ref="parent" style="width: 100%;height: 100%;overflow: hidden">
        <video ref="video" playsinline :src="url" >

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
    import enableInlineVideo from 'iphone-inline-video';

    // 注册
    export default {
        name: 'vue-movie-clip',
        // 声明 props
        props: {
            url: {
                type: String,
                default: ''
            },
            align: {
                type: String,
                default: 'crop center'
            },
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            }
            ,
            width: {
                type: Number,
                default: 640
            },
            height: {
                type: Number,
                default: 320
            }
        },
        data: function () {
            return {
                playing: false,video:null,parent:null
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
            updateSize:function () {
                let width=this.parent.clientWidth;
                let height=this.parent.clientHeight;
                let radio=width/height;

                let cut_w=this.video.videoWidth;
                let cut_h=this.video.videoHeight;
                let radio2=cut_w/cut_h;


                let end_w,end_h;
                if(radio2>radio){
                    end_h=height;
                    end_w=end_h*radio2;
                }else{
                    end_w=width;
                    end_h=end_w/radio2;
                }
                this.video.width=end_w;
                this.video.height=end_h;
                this.video.style.marginLeft=-(end_w-width)/2+'px';
                this.video.style.marginTop=-(end_h-height)/2+'px';

                // $image->crop($cut_w, $cut_h, intval(($image->width()-$cut_w)/2), intval(($image->height()-$cut_h)/2));
                // console.log(this.video.videoWidth)

            }
        },

        watch: {},

        mounted: function () {
            let self = this;
            this.parent=this.$refs.parent;
            this.video=this.$refs.video;
            //console.log(this.$refs.video)
            this.video.oncanplay = function () {
                self.$emit('canplay');
                self.updateSize();
            };
            window.onresize=function () {
                self.updateSize();
            }

          // this.enableInlineVideo(this.$refs.video)
            //  this.updateFrame(this.frame);
            if (this.autoPlay) {
                setTimeout(this.play,1000);
            }


        }


    }


</script>