<template>
    <div>
        <input type="file" @change="handleFileUpload" accept="image/*"/>
        <button @click="recognizeAllImages">识别文本</button>
        <img v-for="url in splitImages" :src="url" :key="url" />
        <div>{{ recognizedText }}</div>
    </div>
</template>

<script>
    import Tesseract from 'tesseract.js';

    export default {
        name: 'main_page',
        data() {
            return {
                worker: null,
                recognizedText: '',
                file: '',
                splitImages:[],
                splitNum:[]
            };
        },
        //与处理图像，先分割图像为多个待识别小图片
        //预处理工具待定为canvas,
        //分割（未完成
        //颜色变换（未完成
        //识别工具
        //并行识别数字
        //逐个识别，然后计算
        //计算方法设计
        methods: {
            async handleFileUpload(event) {
                this.file = event.target.files[0];
                this.readingFile();
            },
            async recognizeAllImages(){
              const workers =[];
              const promises =[];
                for (let url of this.splitImages) {
                    const worker = await Tesseract.createWorker();
                    await worker.loadLanguage('eng');
                    await worker.initialize('eng');

                    promises.push(worker.recognize(url));
                    workers.push(worker);
                }

                const results = await Promise.all(promises);
                this.recognizedText = results.map(r => r.data.text).join(' ');
                console.log(this.recognizedText)
                for (let worker of workers) {
                    await worker.terminate();
                }
            },
            recognizeText() {
                // 将黑白图像转换为 Data URL
                // const blackAndWhiteDataURL = this.$refs.myCanvas.toDataURL('image/png');
                // console.log(blackAndWhiteDataURL);
                // (async () => {
                //
                //     const worker = await Tesseract.createWorker();
                //     await worker.loadLanguage('eng');
                //     await worker.initialize('eng');
                //     const {data: {text}} = await worker.recognize(blackAndWhiteDataURL);
                //     this.recognizedText = text
                //     await worker.terminate();
                //     this.worker = null;
                // })();
            },
//图片预处理
            readingFile(){
                // 创建 FileReader 来读取文件
                const reader = new FileReader();

                // 读取文件为 Data URL
                reader.readAsDataURL(this.file);

                // 在文件加载完成后执行的回调函数
                reader.onload = (e) => {
                    const image = new Image();
                    image.src = e.target.result;

                    // 等待图片加载完成后，在 Canvas 上绘制图片
                    image.onload = () => {

                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');

                        // 将Canvas的宽度和高度设置为图像的宽度和高度
                        canvas.width = image.width;
                        canvas.height = image.height;

                        //修改灰度
                        //this.changeGray(context, canvas)
                        //分割图片
                        this.spliteImg(context,canvas,image, [
                            { x: 1430, y: 250, width: 75, height: 35 }, // 第一个分割位置和大小
                            { x: 1550, y: 250, width: 75, height: 35 }, // 第二个分割位置和大小
                            // 在这里添加更多的分割位置和大小
                        ]);
                    };
                };
            },
            //分割图片
            spliteImg(context,canvas,image,positions) {
                positions.forEach( (position) => {
                    // 清空Canvas
                    canvas.width = position.width;
                    canvas.height = position.height;

                    // 在Canvas上绘制分割后的图像部分
                    context.drawImage(
                        image,
                        position.x,
                        position.y,
                        position.width,
                        position.height,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    // 将分割后的图像保存为数据URL
                    var splitImageDataURL = canvas.toDataURL();
                    this.splitImages.push(splitImageDataURL);
                });


            },
            //修改灰度
            changeGray(context, canvas) {
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data; // 像素数据数组

                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];

                    // 计算灰度值（一般使用加权平均法）
                    const gray = 0.299 * r + 0.587 * g + 0.114 * b;

                    // 将 RGB 值替换为灰度值
                    pixels[i] = gray;
                    pixels[i + 1] = gray;
                    pixels[i + 2] = gray;
                }

                // 将修改后的像素数据放回 Canvas
                context.putImageData(imageData, 0, 0);

            }
        },

    };
</script>
