<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div class="allAndSort" @mouseleave="removeColor" @mouseenter="showList">
                <h2 class="all">全部商品分类</h2>
                <Transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ currentColor: currentIndex == index }">
                                <h3 @mouseenter="getCurretIndex(index)">
                                    <a :data-categoryType="c1.categoryName" :data-categoryTypeId1="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryType="c2.categoryName"
                                                    :data-categoryTypeId2="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryType="c3.categoryName"
                                                        :data-categoryTypeId3="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from 'lodash/throttle';
export default {
    name: "TypeNav",
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    mounted() {
        //判断当前页面是否该隐藏该组件
        if (this.$route.path != "/Home") {
            this.show = false;
        }
    },
    computed: {
        ...mapState({
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        getCurretIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        removeColor() {
            this.currentIndex = -1;
            if (this.$route.path != "/Home") {
                this.show = false;
            }
        },
        goSearch(event) {
            let { categorytype, categorytypeid1, categorytypeid2, categorytypeid3 } = event.target.dataset;
            let locationAndData = { name: 'Search', query: { categoryType: categorytype } };

            if (categorytype) {
                locationAndData.query.categoryType = categorytype;
                if (categorytypeid1) {
                    locationAndData.query.category1Id = categorytypeid1;
                }
                else if (categorytypeid2) {
                    locationAndData.query.category2Id = categorytypeid2;
                }
                else if (categorytypeid3) {
                    locationAndData.query.category3Id = categorytypeid3;
                }
                if(this.$route.params.keyword) locationAndData.params = this.$route.params;
                this.$router.push(locationAndData);
            }
        },
        showList() {
            this.show = true;
        }
    }
}

</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }

                .currentColor {
                    background-color: rgb(235, 73, 33);
                }
            }
        }

        .sort-enter{
            height: 0px;
        }

        .sort-enter-to{
            height: 461px;
        }

        .sort-enter-active{
            transition: all .5s linear;
        }
    }
}
</style>
