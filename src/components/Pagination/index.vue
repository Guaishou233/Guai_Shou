<template>
    <div class="pagination">
        <button :disabled="pageindex==1" @click="feedbackSelectedPage(totalpages - 1 )">上一页</button>
        <button :class="{ active:pageindex === 1}" v-if="computeStartAndEnd.startPage > 1"
                @click="feedbackSelectedPage(1)">1
        </button>
        <button :class="{ active:pageindex === 2}" v-if="computeStartAndEnd.startPage > 2">···</button>

        <button :class="{ active:pageindex === page}" v-for="(page, index) in computeStartAndEnd.endPage" :key="index"
                v-if="page >= computeStartAndEnd.startPage" @click="feedbackSelectedPage(page)">{{ page }}
        </button>


        <button v-if="computeStartAndEnd.endPage < this.totalpages - 1">···</button>
        <button :class="{ active:pageindex === totalpages}" v-if="computeStartAndEnd.endPage < this.totalpages"
                @click="feedbackSelectedPage(totalpages)"> {{ this.totalpages }}
        </button>
        <button :disabled="pageindex==totalpages" @click="feedbackSelectedPage(pageindex + 1 )">下一页</button>
        <button style="margin-left: 30px">共 {{ totalTuple }} 条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: ['totalTuple', "pagesize", 'range', 'pageindex', 'totalpages'],
        computed: {
            computeStartAndEnd() {
                const {range, pageindex, totalpages} = this;
                let startPage = 0,
                    endPage = 0;
                if (range > totalpages) {
                    startPage = 1;
                    endPage = totalpages;
                } else {
                    if (pageindex <= Math.floor(range / 2)) {
                        startPage = 1;
                        endPage = startPage + range - 1;
                    } else if (this.totalpages - pageindex <= Math.floor(range / 2)) {
                        endPage = this.totalpages;
                        startPage = endPage - range + 1;
                    } else {
                        startPage = pageindex - Math.floor(range / 2),
                            endPage = pageindex + Math.floor(range / 2);
                    }
                }
                return {endPage, startPage}
            },

        },
        methods: {
            feedbackSelectedPage(targetPage) {
                this.$emit('getCurrentPageNum', targetPage)
            }
        }

    }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;

    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #dd511a;
        color: #fff;
      }
    }
  }
</style>