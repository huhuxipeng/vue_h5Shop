<template>
  <div class="calendar">
    <div class="title">
      <a @click="preMonth" class="btn-left"></a>{{year}}年{{month}}月<a @click="nextMonth" class="btn-right"></a>
    </div>
    <div class="body">
      <div class="week">
        <div v-for="i in week" class="item">
          {{i}}
        </div>
      </div>
      <div class="day">
        <div v-for="i in days" class="item">
          <label :class="{mark:i.marked}">{{i.date?i.date.getDate():''}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const week = ['日', '一', '二', '三', '四', '五', '六'];
  export default {
    name: "calendar",
    props: ['markedDate'],
    computed: {
      days: function () {
        let dayNum = new Date(this.year, this.month, 0).getDate() + 1;
        let firstWeekDay = new Date(this.year, this.month - 1, 1).getDay();
        let days = [];
        for (let i = 1; i <= firstWeekDay; i++) {
          days.push({
            date: null,
            marked: false
          })
        }
        for (let i = 1; i < dayNum; i++) {

          let day = {
            date: new Date(this.year, this.month - 1, i),
          };

          day.marked = this.needMarkDate(day.date);
          days.push(day)
        }
        return days;
      }
    },
    data: function () {
      let date = new Date();
      return {
        week,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      }
    },
    methods: {
      nextMonth: function () {
        if (this.month < 12) {
          this.month += 1
        } else {
          this.year += 1;
          this.month = 1
        }
      },
      preMonth: function () {
        if (this.month > 1) {
          this.month -= 1
        } else {
          this.year -= 1;
          this.month = 12
        }
      },
      needMarkDate: function (date) {
        for (var i in this.markedDate) {
          let markeItem = this.markedDate[i].split('.')
          let fullYear = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          if (fullYear == markeItem[0] && month == markeItem[1] && day == markeItem[2]) {
            return true;
          }
        }
        return false;
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    .body {
      background: #fff;
    }
    .title {
      padding: 0 4px;
      height: 50px;
      line-height: 50px;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      width: 100%;
      text-align: center;
      background: #fafafa;
      a {
        margin: 0 32px;
      }

    }
    .week {
      color: #999;
      display: flex;
      border-bottom: dashed 1px #eee;
      .item:not(:first-child) {
        border-left: solid 1px #eee;
        height: 31px;
        margin: 10px 0;
        line-height: 31px;
      }
    }
    .day {
      display: flex;
      flex-wrap: wrap;
      font-size: 16px;
      color: #333;
    }
    .item {
      width: 51px;
      height: 51px;
      line-height: 51px;
      text-align: center;
      .mark {
        background: red;
        border-radius: 50%;
        color: white;
        width: 25px;
        height: 25px;
        line-height: 25px;
        display: inline-block;
      }
    }
  }

</style>
