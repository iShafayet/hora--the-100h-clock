<script lang="ts">
  import { CommonConstant } from "../../constant/common-constants.js";
  import {
    epochToHoraTime,
    traditionalSecondsToHoraTime,
  } from "../../lib/date-helper.js";
  import type { HoraTime, TraditionalTime } from "src/model/common.js";
  import Footer from "../common/Footer.svelte";
</script>

<div class="dashboard-page">
  <div class="main-wrapper">
    <div class="page-title">Hṓra: The 100h Clock</div>

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

    <!-- Rules - Start -->
    <div class="rules">
      <div class="label">Intuition:</div>
      <ul class="list">
        <li>Every day has 100,000 Sens.</li>
        <li>Midnight is 00:0:00, the first sens of any day.</li>
        <li>The last sens of any day is 99:9:99.</li>
      </ul>
    </div>
    <!-- Rules - End -->

    <!-- Rules - Start -->
    <div class="rules">
      <div class="label">Relation with traditional time:</div>
      <ul class="list">
        <li>24 hours are equal to 100 Horas.</li>
        <li>86,400 seconds are equal to 100,000 sens.</li>
      </ul>
    </div>
    <!-- Rules - End -->

    <!-- Rules - Start -->
    <div class="rules">
      <div class="label">Coming from traditional time:</div>
      <ul class="list">
        <li>Approximately, in every 15 minutes a Hora passes.</li>
        <li>Approximately, every 4 Horas make an hour.</li>
        <li>At 50 Horas, half a day is over.</li>
        <li>33 Horas is morning (Approximately 8 AM)</li>
        <li>You should get at least 33 Horas of sleep every night.</li>
      </ul>
    </div>
    <!-- Rules - End -->

    <!-- Rules - Start -->
    <div class="rules">
      <div class="label">Benefits and usage:</div>
      <ul class="list">
        <li>
          The units are divisible by 10 and hence mathematically advantageous.
        </li>
        <li>
          Unless you need more granular time (i.e. how long you can hold your
          breath), you don't need to care about Sens or even Meis. Since 1 Hora
          takes up approximately 15 minutes, Horas are all you need to schedule
          your meetings and most timings.
        </li>
        <li>You can simply say, I will see in you a Hora (~15 minutes).</li>
        <li>
          Or say, the meeting will go for 6 Horas (~1 hour and 30 minutes).
        </li>
      </ul>
    </div>
    <!-- Rules - End -->

    <!-- Rules - Start -->
    <div class="rules">
      <div class="label">Formal Definition:</div>
      If you must have a scientific definition, here you go: One Sense is one twenty-fifth
      of the time that elapses during 198,560,846,232 cycles of the radiation produced
      by the transition between two levels of the cesium-133 atom.
    </div>
    <!-- Rules - End -->

    <!-- Rules - Start -->
    <div class="rules">
      <div class="label">Disclaimer and Copyright:</div>
      <ul class="list">
        <li>The Hora project is merely a thought experiment given shape.</li>
        <li>
          The Hora concept, is a concept and hence is beyond copyrighting.
        </li>
        <li>
          No individual/group/entity, to my knowledge, is not using Hora
          currently as their standard of measuring time.
        </li>
        <li>You are free to take it as seriously as you like.</li>
        <li>
          If you end up using it personally or academically, let me (author)
          know.
        </li>
      </ul>
    </div>
    <!-- Rules - End -->
  </div>
</div>

<style>
  .dashboard-page {
    height: calc(100vh - 64px - 50px - 8px);
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    overflow-y: auto;
  }

  .main-wrapper {
    width: calc(100% - 20px);
    max-width: 400px;
    padding: 10px;
    margin-bottom: 30px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

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
