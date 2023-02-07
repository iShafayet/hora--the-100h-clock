<script lang="ts">
  import { CommonConstant } from "../../constant/common-constants.js";
  import {
    epochToHoraTime,
    traditionalSecondsToHoraTime,
  } from "../../lib/date-helper.js";
  import type { HoraTime, TraditionalTime } from "src/model/common.js";
  import Footer from "../common/Footer.svelte";

  let nowHoraTime: HoraTime = {
    hora: 0,
    mei: 0,
    sen: 0,
  };

  let nowTraditionalTime: TraditionalTime = {
    hour: 0,
    minute: 0,
    second: 0,
  };

  function updateClock() {
    let now = Date.now();

    let second = Math.floor(now / 1000) % 60;
    let minute = Math.floor(now / 1000 / 60) % 60;
    let hour = Math.floor(now / 1000 / 60 / 60) % 24;

    nowTraditionalTime = {
      second,
      minute,
      hour,
    };

    let totalSeconds = (hour * 60 + minute) * 60 + second;
    
    let [hora, mei, sen] = traditionalSecondsToHoraTime(totalSeconds);
    nowHoraTime = {
      hora,
      mei,
      sen,
    };

    setTimeout(updateClock, CommonConstant.CLOCK_UPDATE_TIMEOUT);
  }

  setTimeout(updateClock, CommonConstant.CLOCK_UPDATE_TIMEOUT);
</script>

<div class="dashboard-page">
  <div class="main-wrapper">
    <div class="page-title">Hṓra: The 100h Clock</div>

    <div class="current-time-wrapper">
      <!-- Hora Time - Start -->
      <div class="hora-time-wrapper">
        <div class="label">The time is now:</div>
        <div class="hora-time">
          <div class="hora">
            <div class="value">{nowHoraTime.hora}</div>
            <div class="postfix">Hora</div>
          </div>
          <div class="mei">
            <div class="value">{nowHoraTime.mei}</div>
            <div class="postfix">Mei</div>
          </div>
          <div class="sen">
            <div class="value">{nowHoraTime.sen}</div>
            <div class="postfix">Sen</div>
          </div>
        </div>
      </div>
      <!-- Hora Time - End -->

      <!-- Traditional Time - Start -->
      <div class="traditional-time-wrapper">
        <div class="label">Equivalent traditional time:</div>
        <div class="traditional-time">
          <div class="unit">
            <div class="value">{nowTraditionalTime.hour}</div>
            <div class="postfix">Hour</div>
          </div>
          <div class="unit">
            <div class="value">{nowTraditionalTime.minute}</div>
            <div class="postfix">Minute</div>
          </div>
          <div class="unit">
            <div class="value">{nowTraditionalTime.second}</div>
            <div class="postfix">Second</div>
          </div>
        </div>
      </div>
      <!-- Traditional Time - End -->
    </div>

    <!-- Rules - Start -->
    <div class="rules">
      <div class="label">Hora time rules:</div>
      <ul class="list">
        <li>Every day has 100 <span class="unit">Horas</span>.</li>
        <li>Every Hora has 10 <span class="unit">Meis</span>.</li>
        <li>Every Mei has 100 <span class="unit">Sens</span>.</li>
      </ul>
    </div>
    <!-- Rules - End -->
  </div>
</div>
<Footer />

<style>
  .dashboard-page {
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .main-wrapper {
    width: calc(100% - 20px);
    max-width: 400px;
    padding: 10px;
    margin-bottom: 100px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .current-time-wrapper {
    width: 100%;
    /* display: flex; */
  }

  /* --------------------------------- hora - start */

  .hora-time-wrapper .label {
    font-size: 14px;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .hora-time {
    display: flex;
  }

  .hora-time .hora {
    width: 100px;
  }

  .hora-time .mei {
    margin-left: 6px;
    width: 100px;
  }

  .hora-time .sen {
    margin-left: 6px;
    width: 100px;
  }

  .hora-time .hora .value {
    color: #102027;
    background-color: #e0e0e0;
    font-size: 36px;
    text-align: center;
    padding: 6px;
  }

  .hora-time .hora .postfix {
    background-color: #102027;
    color: #e0e0e0;
    font-size: 16px;
    text-align: center;
    padding: 4px;
  }

  .hora-time .mei .value {
    color: #102027;
    background-color: #e0e0e0;
    font-size: 36px;
    text-align: center;
    padding: 6px;
  }

  .hora-time .mei .postfix {
    background-color: #102027;
    color: #e0e0e0;
    font-size: 16px;
    text-align: center;
    padding: 4px;
  }

  .hora-time .sen .value {
    color: #102027;
    background-color: #e0e0e0;
    font-size: 36px;
    text-align: center;
    padding: 6px;
  }

  .hora-time .sen .postfix {
    background-color: #102027;
    color: #e0e0e0;
    font-size: 16px;
    text-align: center;
    padding: 4px;
  }

  /* --------------------------------- hora - end */

  /* --------------------------------- traditional - start */

  .traditional-time-wrapper {
    margin-top: 10px;
  }

  .traditional-time-wrapper .label {
    font-size: 14px;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .traditional-time {
    display: flex;
  }

  .traditional-time .unit {
    margin-left: 6px;
    width: 60px;
  }

  .traditional-time .unit:first-child {
    margin-left: 0px;
  }

  .traditional-time .unit .value {
    color: #102027;
    background-color: #e0e0e0;
    font-size: 24px;
    text-align: center;
    padding: 6px;
  }

  .traditional-time .unit .postfix {
    background-color: #102027;
    color: #e0e0e0;
    font-size: 14px;
    text-align: center;
    padding: 4px;
  }

  /* --------------------------------- traditional - end */

  .rules {
    font-size: 14px;
  }

  .rules .label {
    font-size: 16px;
    margin-top: 24px;
    margin-bottom: 4px;
  }

  .rules .list {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 20px;
    line-height: 1.4;
  }

  .rules .unit {
    text-decoration: underline;
  }
</style>
