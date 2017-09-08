<template>
  <!-- 区域切换 -->
  <div>
    <div class="hc-indexHeader">
      <div class="i-btn i-search" @click="gotoSearch"></div>
      <div class="hc-area-select">
        <div class="hc-area-item" @click="allGroup" :class="{'active': allGroupActive}">{{mainCurrentArea.name}}</div>
        <div class="hc-area-list" @click="selectedArea()" :class="{'active': selectedAreaActive }" v-if="rightCurrentArea.name">
          <span class="hc-area-list-cell">{{ rightCurrentArea.name }}</span>
          <div class="hc-area-list-sub" v-if="showDropdown" @click.stop="closeCover">
            <div v-for="( item, index ) in otherAreaList" class="hc-area-sub-item" @click.stop="itemOfArea(item)">{{ item.name }}</div>
            <!-- :class="{'active': areaItemActiveIndex === index}" -->
          </div>
        </div>
        <div class="hc-ih-right" v-show="codeList">
          <div class="hc-ih-inner">
            <div class="hc-ih-item item1" @click="qrCode">扫一扫</div>
            <div class="hc-ih-item borderT" @click="classCode">上课码</div>
          </div>
        </div>
      </div>
      <div class="i-btn i-qrCode" @click="codeShow"></div>
    </div>
    <div class="hc-area-list-cover" v-if="showDropdown" @click.stop="closeCover"></div>
  </div>
</template>

<style lang="less">
  @import "./indexHeader.less";
</style>

<script type="text/babel">
import {mapState} from 'vuex'
import appSanner from '@/appcan/appScanner'
// import {getGeoAreaList} from '@/service/taoke'
export default {
  name: 'hc-indexHeader',
  data() {
    return {
      codeList: false,
      allGroupActive: true,
      selectedAreaActive: false,
      showDropdown: false,
      selectionShowIndex: 0,
      areaItemActiveIndex: 0,
      selectionDefault: [],
      currentArea:{},
      userInfo:{},
      mainCurrentArea:{},
      rightCurrentArea:{},
      areaList:[],
      otherAreaList:[],
      allOtherAreaList:[],
    }
  },
  created(){ // 实例创建之后
    this.pageInit();
  },
  activated(){ // 实例创建之后

  },
  computed: {
    ...mapState({
      // areaList: state => state.taoke.areaList,
      // currentArea: state => state.taoke.currentArea,
      // userInfo: state => state.user.userInfo
    }),
  },
  deactivated() {
    this.codeList = false;
  },
  methods: {
    pageInit(){
      console.log("indexHeader -> pageInit ")
      let self = this;
      let currentArea=JSON.parse(localStorage.getItem("currentArea"));
      self.currentArea=currentArea;
      let userInfo=JSON.parse(localStorage.getItem("userInfo"));
      self.userInfo=userInfo;
      let mainCurrArea=JSON.parse(localStorage.getItem("mainCurrentArea"));
      self.mainCurrentArea=mainCurrArea;
      this.allOtherAreaList=JSON.parse(localStorage.getItem("otherCurrentArea"));
      let otherAreaList=JSON.parse(localStorage.getItem("otherCurrentArea"));
      this.otherAreaList=otherAreaList;
      console.log('Create -> currentArea: ', this.currentArea," userInfo",this.userInfo);
      if(this.currentArea==null||this.userInfo==null){
        window.location.hash = '#/login';
      }
      let num=0;
      for(let i=0;i<this.allOtherAreaList.length;i++){
        if(this.userInfo.userAreaId==this.allOtherAreaList[i].code){
          num=i;
          continue;
        }
      }
      this.rightCurrentArea=this.allOtherAreaList[num];
      let newList=this.removeArr(this.allOtherAreaList,num);
      this.otherAreaList=[];
      this.otherAreaList=newList;
      self.$store.dispatch('clearAreaPullData');
      self.$store.dispatch('updateAreaPullData');
    },
    codeShow() {
      this.codeList = !this.codeList;
      this.closeCover();
      this.showDropdown = false
    },
    gotoSearch () {
      console.log('location: "/search"');
      this.$router.push('/search');
    },
    ScannerSuccessCallBack(opCode, dataType, data){
      if(dataType==1){
        console.log("扫描成功后的回调函数 open -> opCode: ",opCode," dataType: ",dataType," data: ",data);
      }
    },
    ScannerFailedCallBack(data){
      console.log("扫描失败 -> data: ",data);
    },
    classCode() { //上课码
      this.codeList = false;
      this.closeCover();
      let self=this;
      self.$router.push('/scanCode');
      console.log("上课码 -> 这里应该有上课码的东东");
    },
    qrCode() {
      this.codeList = false;
      this.closeCover();
      let self=this;
      console.log('调用扫码 ->  ');
      console.log('用户信息 ->  ',self.userInfo);

      appSanner.openScanner();

    },
    allGroup (ev) { // 点击集团公共
      this.allGroupActive = true
      this.selectedAreaActive = false
      this.showDropdown = false
      // 记录所选区域
      localStorage.setItem('currentArea', JSON.stringify(this.mainCurrentArea))
      this.currentArea={};
      this.currentArea=this.mainCurrentArea;
      this.$store.dispatch('clearAreaPullData');
      this.$store.dispatch('updateAreaPullData');
    },
    selectedArea () {
      console.log("--------------------------------");
      console.log("右侧 区域选择 -> allGroup ->  this.rightCurrentArea: ",this.rightCurrentArea.code,"this.currentArea.code: ",this.currentArea.code);
      if(this.rightCurrentArea.code==this.currentArea.code){
        this.selectedAreaActive = true;
        this.allGroupActive = false;
        this.showDropdown = true;
        this.codeList = false;
      }else{
        this.itemOfArea(this.rightCurrentArea);
        this.selectedAreaActive = true;
        this.allGroupActive = false;
      }
    },
    closeCover (ev) {
      this.showDropdown = false
    },
    itemOfArea (itemArea) { // 选择下拉框区域
      console.log("区域选择 -> itemOfArea -> itemArea : ",itemArea);
      this.selectionShowIndex = 1
      this.areaItemActiveIndex = 1
      let curArea = itemArea;
      this.showDropdown = false;

      // 记录所选区域
      this.currentArea=curArea;
      localStorage.setItem('currentArea', JSON.stringify(curArea))
      this.rightCurrentArea={};
      this.rightCurrentArea=curArea;

      let num=0;
      for(let i=0;i<this.allOtherAreaList.length;i++){
        if(curArea.code==this.allOtherAreaList[i].code){
          num=i;
          continue;
        }
      }

      let newList=this.removeArr(this.allOtherAreaList,num);

      this.otherAreaList=[];

      this.otherAreaList=newList;

      console.log("-----> 设置缓存值：this.currentArea ",this.currentArea.code," this.rightCurrentArea:",this.rightCurrentArea.code)

      // this.$store.commit('setCurrentArea', curArea);
      this.$store.dispatch('clearAreaPullData');
      this.$store.dispatch('updateAreaPullData');

    },
    removeArr(arr,num){
      let newarr=[];
      for(let i=0;i<arr.length;i++){
        if(num!=i){
          newarr.push(arr[i]);
        }
      }
      return newarr;
    }
  }
}
</script>
