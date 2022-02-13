<template>
        <div class="sticky-title" @click="showDrawer">
            <span >
                <a-icon type="left"></a-icon>
            </span>

            <a-drawer
                    title="Indicators"
                    :placement="placement"
                    :width="350"
                    :closable="true"
                    :visible="visible"
                    @close="onClose"
            >
                <ul>
                    <li v-for="menu in menus">
                        <a :href="'#' + menu.tag" @click="onClose">{{ menu.title }}</a>
                    </li>
                </ul>

            </a-drawer>
        </div>


</template>

    <script>
    export default {
        data() {
            return {
                visible: false,
                placement: 'left',
                menus:[

                ]
            };
        },
        methods: {
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            },
            onChange(e) {
                this.placement = e.target.value;
            },
            getIndicator(){
                this.loading=true;
                this.$axios.get('v1/configs/indicator/active').then(response => {
                    this.menus = response.data.data;
                    console.log('Indicator List',response.data.data);
                    this.loading = false;
                })
            }
        },
        created() {
            this.getIndicator();
        },
    };
</script>


<style lang="scss">
    .sticky-title{
        position: absolute;
        right: 0;
        top:50%;
        background-color: #3598dc;
        padding: 10px;
        position: sticky;
        width: fit-content;
        z-index: 999;
        cursor: pointer;
        color: #fff;
        margin-left: -10px;

    }
    .ant-drawer-body{
        padding: 0;
        ul{
            padding-left: 0px;
            margin-left: 0;
            li {
                border-bottom: 1px solid #e2e2e2;
                padding: 0 20px;

                list-style-type: none;
                a{
                    line-height: 50px;
                    color: #47494e;
                }
            }
        }
    }
    .ant-drawer-header{
        background-color: #3598dc;
        .ant-drawer-title{
            color:#fff;
        }
    }


</style>