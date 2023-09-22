<template>
    <div>
        <input type="file" @change="handleFileUpload" accept="image/*"/>
        <button @click="recognizeAllImages">识别文本</button>
        <img v-for="url in splitImages" :src="url" :key="url" />
        <button @click="calculate">计算</button>
        <div>{{red_operatorsArray}}{{ red_numbersArray }}</div>
        <div>{{blue_operatorsArray}}{{ blue_numbersArray }}</div>
    </div>
</template>

<script>
    import Tesseract from 'tesseract.js';

    export default {
        name: 'main_page',
        data() {
            return {
                worker: null,
                recognizedText: [],
                file: '',
                splitImages:[],
                splitNum:[],
                red_operatorsArray:[],
                blue_operatorsArray:[],
                red_numbersArray:[],
                blue_numbersArray:[],
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
                let addToRedArray = true; // 初始时添加到红色数组
                // 使用map函数遍历results
                results.map(r => {
                    // 使用正则表达式匹配运算符+空格+数字+换行符的模式
                    const regex = /([-+*/])\s*(\d+)\n/g;

                    // 在文本中查找匹配的模式
                    // 在文本中查找匹配的模式
                    let match;

                    while ((match = regex.exec(r.data.text)) !== null) {
                        const operator = match[1]; // 运算符
                        const number = parseInt( match[2],10);   // 数字
                        if (addToRedArray) {
                            this.red_operatorsArray.push(operator);
                            this.red_numbersArray.push(number);
                        } else {
                            this.blue_operatorsArray.push(operator);
                            this.blue_numbersArray.push(number);
                        }

                        // 切换到下一个数组，实现奇偶分离
                        addToRedArray = !addToRedArray;
                    }

                });

// 现在operatorsArray包含了运算符号，numbersArray包含了数字
                console.log("Operators:", this.red_operatorsArray);
                console.log("Numbers:", this.red_numbersArray);
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
                            { x: 1435, y: 260, width: 70, height: 30 }, // 第一个分割位置和大小
                            { x: 1560, y: 250, width: 70, height: 30 }, // 第二个分割位置和大小
                            { x: 1430, y: 360, width: 70, height: 30 },
                            { x: 1560, y: 360, width: 70, height: 30 },
                            { x: 1430, y: 470, width: 70, height: 30 },
                            { x: 1550, y: 470, width: 70, height: 30 },
                            { x: 1430, y: 570, width: 70, height: 30 },
                            { x: 1550, y: 570, width: 70, height: 30 },
                            { x: 1430, y: 672, width: 70, height: 30 },
                            { x: 1550, y: 672, width: 70, height: 30 },
                            { x: 1430, y: 774, width: 70, height: 30 },
                            { x: 1550, y: 774, width: 70, height: 30 },
                            { x: 1430, y: 880, width: 70, height: 30 },
                            { x: 1550, y: 880, width: 70, height: 30 },
                            { x: 1430, y: 980, width: 70, height: 30 },
                            { x: 1550, y: 980, width: 70, height: 30 },
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

            },
//逐个识别，然后计算
            //计算方法设计
            calculate(){

                function cal(input, op, num) {
                    switch (op) {
                        case '+':
                            input += num;
                            break;
                        case '-':
                            input -= num;
                            break;
                        case '*':
                            input *= num;
                            break;
                        case '/':
                            input = Math.floor(input / num) + (input % num === 0 ? 0 : 1);
                            break;
                        default:
                            break;
                    }
                    return input;
                }

                function log(op, nums, input, select) {
                    let i = 0;
                    while (select > 0) {
                        if (select & 1) {
                            console.log(`${input} ${op[i]} ${nums[i]} = ${input}`);
                            cal(input, op[i], nums[i]);
                        }
                        i++;
                        select >>= 1;
                    }
                }

                function solve(op, nums, input, output, select) {
                    let i = 0;
                    while (select > 0) {
                        if (select & 1) {
                            input = cal(input, op[i], nums[i]);
                        }
                        i++;
                        select >>= 1;
                    }
                    return  input === output;
                }

                for (let i = 0; i < (1 << 8); i++) {
                    if (solve(this.red_operatorsArray, this.red_numbersArray, 80, 28, i) && solve(this.blue_operatorsArray, this.blue_numbersArray, 80, 90, i)) {
                        console.log("Red");
                        log(this.red_operatorsArray, this.red_numbersArray, 80, i);
                        console.log("Blue");
                        log(this.blue_operatorsArray, this.blue_numbersArray, 80, i);
                        console.log("-------------");
                    }
                }

            }
        },
    };
</script>
