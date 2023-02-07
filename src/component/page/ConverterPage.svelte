<script lang="ts">
  import FormField from "@smui/form-field";
  import Textfield from "@smui/textfield";
  import Checkbox from "@smui/checkbox";
  import { CommonConstant } from "../../constant/common-constants.js";
  import {
    epochToHoraTime,
    traditionalSecondsToHoraTime,
  } from "../../lib/date-helper.js";
  import Footer from "../common/Footer.svelte";

  let calcHoraTime = {
    hora: 0,
    mei: 0,
    sen: 0,
    totalSens: 0,
  };

  let calcTraditionalTime = {
    hour: 0,
    minute: 0,
    second: 0,
    totalSeconds: 0,
  };

  let shouldNormalizeTime = true;

  function calculateHoraToTrad() {
    console.log("START", calcHoraTime, calcTraditionalTime);

    let { hora, mei, sen } = calcHoraTime;
    if (hora < 0) hora = 0;
    if (mei < 0) mei = 0;
    if (sen < 0) sen = 0;

    if (shouldNormalizeTime) {
      if (sen >= 100) {
        mei += Math.floor(sen / 100);
        sen = sen % 100;
      }
      if (mei >= 10) {
        hora += Math.floor(mei / 10);
        mei = mei % 10;
      }
    }

    let totalSens = (hora * 10 + mei) * 100 + sen;

    let totalSeconds =
      Math.floor(
        (totalSens / CommonConstant.SECS_TO_SENS_CONVERSION_CONSTANT) * 1000
      ) / 1000;

    let second = Math.floor(totalSeconds) % 60;
    let minute = Math.floor(totalSeconds / 60) % 60;
    let hour = Math.floor(totalSeconds / 60 / 60);

    calcHoraTime = { hora, mei, sen, totalSens };
    calcTraditionalTime = { second, minute, hour, totalSeconds };

    console.log("END", calcHoraTime, calcTraditionalTime);
  }

  function calculateTradToHora() {
    console.log("START", calcHoraTime, calcTraditionalTime);

    let { second, minute, hour } = calcTraditionalTime;
    if (second < 0) second = 0;
    if (minute < 0) minute = 0;
    if (hour < 0) hour = 0;

    if (shouldNormalizeTime) {
      if (second >= 60) {
        minute += Math.floor(second / 60);
        second = second % 60;
      }
      if (minute >= 60) {
        hour += Math.floor(minute / 60);
        minute = minute % 60;
      }
    }

    let totalSeconds = (hour * 60 + minute) * 60 + second;

    let totalSens =
      Math.floor(
        totalSeconds * CommonConstant.SECS_TO_SENS_CONVERSION_CONSTANT * 1000
      ) / 1000;

    let [hora, mei, sen] = traditionalSecondsToHoraTime(totalSeconds);

    calcHoraTime = { hora, mei, sen, totalSens };
    calcTraditionalTime = { second, minute, hour, totalSeconds };

    console.log("END", calcHoraTime, calcTraditionalTime);
  }
</script>

<div class="converter-page">
  <div class="main-wrapper">
    <!-- Converter - start -->
    <div class="converter">
      <div class="group">
        <div class="group-title">Hora Time:</div>
        <Textfield
          bind:value={calcHoraTime.hora}
          label="Hora"
          type="number"
          class="group-text-input"
          on:input={calculateHoraToTrad}
        />
        <Textfield
          bind:value={calcHoraTime.mei}
          label="Mei"
          type="number"
          class="group-text-input"
          on:input={calculateHoraToTrad}
        />
        <Textfield
          bind:value={calcHoraTime.sen}
          label="Sen"
          type="number"
          class="group-text-input"
          on:input={calculateHoraToTrad}
        />
        <div class="total">
          Total Sens: {calcHoraTime.totalSens}
        </div>
      </div>
      <div class="group">
        <div class="group-title">Traditional Time:</div>
        <Textfield
          bind:value={calcTraditionalTime.hour}
          label="Hour"
          type="number"
          class="group-text-input"
          on:input={calculateTradToHora}
        />
        <Textfield
          bind:value={calcTraditionalTime.minute}
          label="Minute"
          type="number"
          class="group-text-input"
          on:input={calculateTradToHora}
        />
        <Textfield
          bind:value={calcTraditionalTime.second}
          label="Seconds"
          type="number"
          class="group-text-input"
          on:input={calculateTradToHora}
        />
        <div class="total">
          Total Seconds: {calcTraditionalTime.totalSeconds}
        </div>
      </div>

      <div class="group">
        <div class="group-title">Options:</div>
        <FormField>
          <Checkbox bind:checked={shouldNormalizeTime} />
          <span slot="label">Normalize time before conversion.</span>
        </FormField>
      </div>
    </div>

    <!-- Converter - end -->
  </div>
</div>

<style>
  .converter-page {
    height: calc(100vh - 64px - 50px - 8px);
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

  /* --------------------------------- calculator and converter - start */
  .converter {
    width: 100%;
  }

  .group {
    margin-top: 28px;
  }

  .group:first-child {
    margin-top: 0px;
  }

  .group-title {
    font-size: 18px;
    margin-bottom: 6px;
    margin-top: 6px;
  }

  * :global(.group-text-input) {
    width: 60px;
    margin-right: 8px;
  }

  .total {
    margin-top: 8px;
    font-size: 14px;
  }
  /* --------------------------------- calculator and converter - end */
</style>
