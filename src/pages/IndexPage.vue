<template>
  <div class="content">
    <div class="content-menu__fn">
      <div class="content-menu__fn__container">
        <div class="content-menu__fn__container--field data">No date ()</div>
        <div class="content-menu__fn__container--field filter">Filter</div>
        <div class="content-menu__fn__container--field sort">Sort</div>
        <div class="content-menu__fn__container--field search">
          <svg viewBox="0 0 16 16" class="collectionSearch">
            <path
              d="M0 6.35938C0 9.86719 2.85156 12.7188 6.35938 12.7188C7.66406 12.7188 8.85938 12.3203 9.85938 11.6406L13.4531 15.2344C13.6719 15.4609 13.9766 15.5625 14.2812 15.5625C14.9453 15.5625 15.4219 15.0625 15.4219 14.4141C15.4219 14.1016 15.3125 13.8125 15.1016 13.5938L11.5312 10.0156C12.2734 8.99219 12.7188 7.72656 12.7188 6.35938C12.7188 2.85156 9.86719 0 6.35938 0C2.85156 0 0 2.85156 0 6.35938ZM1.65625 6.35938C1.65625 3.76562 3.75781 1.65625 6.35938 1.65625C8.95312 1.65625 11.0625 3.76562 11.0625 6.35938C11.0625 8.95312 8.95312 11.0625 6.35938 11.0625C3.75781 11.0625 1.65625 8.95312 1.65625 6.35938Z"
            ></path>
          </svg>
        </div>
        <div class="content-menu__fn__container--field arrows">
          <svg viewBox="0 0 13 3" class="dots">
            <g>
              <path d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"></path>
              <path d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"></path>
              <path
                d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"
              ></path>
            </g>
          </svg>
        </div>
        <div class="new" @click="modalOpen">New</div>
        <div class="new__arrow" @click="modalOpen">
          <svg viewBox="0 0 30 30" class="chevronDown">
            <polygon
              points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "
            ></polygon>
          </svg>
        </div>
      </div>
    </div>
    <div class="data-switch__container">
      <div class="data__container">
        <div class="calendar-data">September 2022</div>
      </div>
      <div class="month-switch">
        <div class="month-switch__arrow-left">
          <svg viewBox="0 0 30 30" class="month-switch__arrow-left--svg">
            <polygon
              points="12.6 15 23 25.2 20.2 28 7 15 20.2 2 23 4.8"
            ></polygon>
          </svg>
        </div>
        <div class="month-switch__text">Today</div>
        <div class="month-switch__arrow-right">
          <svg viewBox="0 0 30 30" class="month-switch__arrow-left--svg">
            <polygon points="17.4,15 7,25.2 9.8,28 23,15 9.8,2 7,4.8"></polygon>
          </svg>
        </div>
      </div>
    </div>
    <div class="calendar">
      <div class="calendar-header">
        <div class="mouth_sun mouth">Sun</div>
        <div class="mouth">Mon</div>
        <div class="mouth">Tue</div>
        <div class="mouth">Wed</div>
        <div class="mouth">Thu</div>
        <div class="mouth">Fri</div>
        <div class="mouth_sat mouth">Sat</div>
      </div>
      <div class="calendar__container">
        <div class="calendar__container__days">
          <app-field
            v-for="(fieldLine, idx) in dats.length"
            :key="fieldLine"
            :date="dats[idx]"
            :tasks="getFieldTasks(dats[idx])"
            @open="modalOpen"
            @new-card="createCard"
            @open-redact="modalOpenRedact"
            @change-checkbox="changeCheckbox"
          />
        </div>
      </div>
    </div>
  </div>
  <modal-window :modal-open="modalValue" @modal-close="modalClose">
    <slot>
      <div class="modal-content__title">
        <input
          class="modal-content__input"
          placeholder="Untitled"
          v-model="title"
        />
      </div>
      <div class="modal-content__table">
        <div class="modal-content__table--string">
          <div class="string-left">
            <svg viewBox="0 0 16 16" class="typesDate">
              <path
                d="M3.29688 14.4561H12.7031C14.1797 14.4561 14.9453 13.6904 14.9453 12.2344V3.91504C14.9453 2.45215 14.1797 1.69336 12.7031 1.69336H3.29688C1.82031 1.69336 1.05469 2.45215 1.05469 3.91504V12.2344C1.05469 13.6973 1.82031 14.4561 3.29688 14.4561ZM3.27637 13.1162C2.70898 13.1162 2.39453 12.8154 2.39453 12.2207V5.9043C2.39453 5.30273 2.70898 5.00879 3.27637 5.00879H12.71C13.2842 5.00879 13.6055 5.30273 13.6055 5.9043V12.2207C13.6055 12.8154 13.2842 13.1162 12.71 13.1162H3.27637ZM6.68066 7.38086H7.08398C7.33008 7.38086 7.41211 7.30566 7.41211 7.05957V6.66309C7.41211 6.41699 7.33008 6.3418 7.08398 6.3418H6.68066C6.44141 6.3418 6.35938 6.41699 6.35938 6.66309V7.05957C6.35938 7.30566 6.44141 7.38086 6.68066 7.38086ZM8.92285 7.38086H9.31934C9.56543 7.38086 9.64746 7.30566 9.64746 7.05957V6.66309C9.64746 6.41699 9.56543 6.3418 9.31934 6.3418H8.92285C8.67676 6.3418 8.59473 6.41699 8.59473 6.66309V7.05957C8.59473 7.30566 8.67676 7.38086 8.92285 7.38086ZM11.1582 7.38086H11.5547C11.8008 7.38086 11.8828 7.30566 11.8828 7.05957V6.66309C11.8828 6.41699 11.8008 6.3418 11.5547 6.3418H11.1582C10.9121 6.3418 10.8301 6.41699 10.8301 6.66309V7.05957C10.8301 7.30566 10.9121 7.38086 11.1582 7.38086ZM4.44531 9.58203H4.84863C5.09473 9.58203 5.17676 9.50684 5.17676 9.26074V8.86426C5.17676 8.61816 5.09473 8.54297 4.84863 8.54297H4.44531C4.20605 8.54297 4.12402 8.61816 4.12402 8.86426V9.26074C4.12402 9.50684 4.20605 9.58203 4.44531 9.58203ZM6.68066 9.58203H7.08398C7.33008 9.58203 7.41211 9.50684 7.41211 9.26074V8.86426C7.41211 8.61816 7.33008 8.54297 7.08398 8.54297H6.68066C6.44141 8.54297 6.35938 8.61816 6.35938 8.86426V9.26074C6.35938 9.50684 6.44141 9.58203 6.68066 9.58203ZM8.92285 9.58203H9.31934C9.56543 9.58203 9.64746 9.50684 9.64746 9.26074V8.86426C9.64746 8.61816 9.56543 8.54297 9.31934 8.54297H8.92285C8.67676 8.54297 8.59473 8.61816 8.59473 8.86426V9.26074C8.59473 9.50684 8.67676 9.58203 8.92285 9.58203ZM11.1582 9.58203H11.5547C11.8008 9.58203 11.8828 9.50684 11.8828 9.26074V8.86426C11.8828 8.61816 11.8008 8.54297 11.5547 8.54297H11.1582C10.9121 8.54297 10.8301 8.61816 10.8301 8.86426V9.26074C10.8301 9.50684 10.9121 9.58203 11.1582 9.58203ZM4.44531 11.7832H4.84863C5.09473 11.7832 5.17676 11.708 5.17676 11.4619V11.0654C5.17676 10.8193 5.09473 10.7441 4.84863 10.7441H4.44531C4.20605 10.7441 4.12402 10.8193 4.12402 11.0654V11.4619C4.12402 11.708 4.20605 11.7832 4.44531 11.7832ZM6.68066 11.7832H7.08398C7.33008 11.7832 7.41211 11.708 7.41211 11.4619V11.0654C7.41211 10.8193 7.33008 10.7441 7.08398 10.7441H6.68066C6.44141 10.7441 6.35938 10.8193 6.35938 11.0654V11.4619C6.35938 11.708 6.44141 11.7832 6.68066 11.7832ZM8.92285 11.7832H9.31934C9.56543 11.7832 9.64746 11.708 9.64746 11.4619V11.0654C9.64746 10.8193 9.56543 10.7441 9.31934 10.7441H8.92285C8.67676 10.7441 8.59473 10.8193 8.59473 11.0654V11.4619C8.59473 11.708 8.67676 11.7832 8.92285 11.7832Z"
              ></path>
            </svg>
            <div class="string-text">Data</div>
          </div>
          <div class="container--data">
            <datepicker
              range
              lang="en"
              type="date"
              v-model="dateModel"
              class="startData"
              placeholder="Start data "
            />
          </div>
        </div>
        <div class="modal-content__table--string">
          <div class="string-left">
            <svg viewBox="0 0 16 16" class="typesDate">
              <path
                d="M3.29688 14.4561H12.7031C14.1797 14.4561 14.9453 13.6904 14.9453 12.2344V3.91504C14.9453 2.45215 14.1797 1.69336 12.7031 1.69336H3.29688C1.82031 1.69336 1.05469 2.45215 1.05469 3.91504V12.2344C1.05469 13.6973 1.82031 14.4561 3.29688 14.4561ZM3.27637 13.1162C2.70898 13.1162 2.39453 12.8154 2.39453 12.2207V5.9043C2.39453 5.30273 2.70898 5.00879 3.27637 5.00879H12.71C13.2842 5.00879 13.6055 5.30273 13.6055 5.9043V12.2207C13.6055 12.8154 13.2842 13.1162 12.71 13.1162H3.27637ZM6.68066 7.38086H7.08398C7.33008 7.38086 7.41211 7.30566 7.41211 7.05957V6.66309C7.41211 6.41699 7.33008 6.3418 7.08398 6.3418H6.68066C6.44141 6.3418 6.35938 6.41699 6.35938 6.66309V7.05957C6.35938 7.30566 6.44141 7.38086 6.68066 7.38086ZM8.92285 7.38086H9.31934C9.56543 7.38086 9.64746 7.30566 9.64746 7.05957V6.66309C9.64746 6.41699 9.56543 6.3418 9.31934 6.3418H8.92285C8.67676 6.3418 8.59473 6.41699 8.59473 6.66309V7.05957C8.59473 7.30566 8.67676 7.38086 8.92285 7.38086ZM11.1582 7.38086H11.5547C11.8008 7.38086 11.8828 7.30566 11.8828 7.05957V6.66309C11.8828 6.41699 11.8008 6.3418 11.5547 6.3418H11.1582C10.9121 6.3418 10.8301 6.41699 10.8301 6.66309V7.05957C10.8301 7.30566 10.9121 7.38086 11.1582 7.38086ZM4.44531 9.58203H4.84863C5.09473 9.58203 5.17676 9.50684 5.17676 9.26074V8.86426C5.17676 8.61816 5.09473 8.54297 4.84863 8.54297H4.44531C4.20605 8.54297 4.12402 8.61816 4.12402 8.86426V9.26074C4.12402 9.50684 4.20605 9.58203 4.44531 9.58203ZM6.68066 9.58203H7.08398C7.33008 9.58203 7.41211 9.50684 7.41211 9.26074V8.86426C7.41211 8.61816 7.33008 8.54297 7.08398 8.54297H6.68066C6.44141 8.54297 6.35938 8.61816 6.35938 8.86426V9.26074C6.35938 9.50684 6.44141 9.58203 6.68066 9.58203ZM8.92285 9.58203H9.31934C9.56543 9.58203 9.64746 9.50684 9.64746 9.26074V8.86426C9.64746 8.61816 9.56543 8.54297 9.31934 8.54297H8.92285C8.67676 8.54297 8.59473 8.61816 8.59473 8.86426V9.26074C8.59473 9.50684 8.67676 9.58203 8.92285 9.58203ZM11.1582 9.58203H11.5547C11.8008 9.58203 11.8828 9.50684 11.8828 9.26074V8.86426C11.8828 8.61816 11.8008 8.54297 11.5547 8.54297H11.1582C10.9121 8.54297 10.8301 8.61816 10.8301 8.86426V9.26074C10.8301 9.50684 10.9121 9.58203 11.1582 9.58203ZM4.44531 11.7832H4.84863C5.09473 11.7832 5.17676 11.708 5.17676 11.4619V11.0654C5.17676 10.8193 5.09473 10.7441 4.84863 10.7441H4.44531C4.20605 10.7441 4.12402 10.8193 4.12402 11.0654V11.4619C4.12402 11.708 4.20605 11.7832 4.44531 11.7832ZM6.68066 11.7832H7.08398C7.33008 11.7832 7.41211 11.708 7.41211 11.4619V11.0654C7.41211 10.8193 7.33008 10.7441 7.08398 10.7441H6.68066C6.44141 10.7441 6.35938 10.8193 6.35938 11.0654V11.4619C6.35938 11.708 6.44141 11.7832 6.68066 11.7832ZM8.92285 11.7832H9.31934C9.56543 11.7832 9.64746 11.708 9.64746 11.4619V11.0654C9.64746 10.8193 9.56543 10.7441 9.31934 10.7441H8.92285C8.67676 10.7441 8.59473 10.8193 8.59473 11.0654V11.4619C8.59473 11.708 8.67676 11.7832 8.92285 11.7832Z"
              ></path>
            </svg>
            <div class="string-text">Data Created</div>
          </div>
          <div class="string-right string-text-2">13:10 -> 2:13</div>
        </div>
        <div class="modal-content__table--string">
          <div class="string-left">
            <svg viewBox="0 0 16 16" class="typesCheckbox">
              <path
                d="M3.85742 14.4561H12.1357C13.6123 14.4561 14.3779 13.6904 14.3779 12.2344V3.91504C14.3779 2.45215 13.6123 1.69336 12.1357 1.69336H3.85742C2.38086 1.69336 1.61523 2.45215 1.61523 3.91504V12.2344C1.61523 13.6973 2.38086 14.4561 3.85742 14.4561ZM3.93945 13.1162C3.30371 13.1162 2.95508 12.7812 2.95508 12.1182V4.02441C2.95508 3.36133 3.30371 3.0332 3.93945 3.0332H12.0537C12.6826 3.0332 13.0381 3.36133 13.0381 4.02441V12.1182C13.0381 12.7812 12.6826 13.1162 12.0537 13.1162H3.93945ZM7.26855 11.3115C7.51465 11.3115 7.72656 11.1885 7.87012 10.9697L10.9258 6.19141C11.0146 6.04785 11.0967 5.88379 11.0967 5.72656C11.0967 5.3916 10.7959 5.16602 10.4746 5.16602C10.2695 5.16602 10.085 5.27539 9.94141 5.50781L7.24121 9.8418L5.96973 8.22168C5.80566 8.00977 5.6416 7.93457 5.43652 7.93457C5.10156 7.93457 4.8418 8.20117 4.8418 8.54297C4.8418 8.70703 4.90332 8.85742 5.01953 9.00098L6.63281 10.9697C6.81738 11.209 7.01562 11.3115 7.26855 11.3115Z"
              ></path>
            </svg>
            <div class="string-text">Готово</div>
          </div>
          <div class="string-right string-text">
            <input
              type="checkbox"
              class="checkbox"
              :checked="isDone"
              @click="clickOnCheckbox"
            />
          </div>
        </div>
        <div class="modal-content__table--string">
          <div class="string-left">
            <svg viewBox="0 0 16 16" class="typesSelect">
              <path
                d="M8 15.126C11.8623 15.126 15.0615 11.9336 15.0615 8.06445C15.0615 4.20215 11.8623 1.00293 7.99316 1.00293C4.13086 1.00293 0.938477 4.20215 0.938477 8.06445C0.938477 11.9336 4.1377 15.126 8 15.126ZM8 13.7383C4.85547 13.7383 2.33301 11.209 2.33301 8.06445C2.33301 4.91992 4.84863 2.39746 7.99316 2.39746C11.1377 2.39746 13.6738 4.91992 13.6738 8.06445C13.6738 11.209 11.1445 13.7383 8 13.7383ZM7.62402 10.6348C7.79492 10.915 8.20508 10.9287 8.37598 10.6348L10.666 6.73145C10.8574 6.41016 10.7002 6.04102 10.3652 6.04102H5.62793C5.29297 6.04102 5.14941 6.43066 5.32031 6.73145L7.62402 10.6348Z"
              ></path>
            </svg>
            <div class="string-text">Приоритет</div>
          </div>
          <div class="green string-text-2 string-right">{{ priority }}</div>
        </div>
        <div class="modal-content__table--string">
          <div class="string-left">
            <svg viewBox="0 0 16 16" class="typesSelect">
              <path
                d="M8 15.126C11.8623 15.126 15.0615 11.9336 15.0615 8.06445C15.0615 4.20215 11.8623 1.00293 7.99316 1.00293C4.13086 1.00293 0.938477 4.20215 0.938477 8.06445C0.938477 11.9336 4.1377 15.126 8 15.126ZM8 13.7383C4.85547 13.7383 2.33301 11.209 2.33301 8.06445C2.33301 4.91992 4.84863 2.39746 7.99316 2.39746C11.1377 2.39746 13.6738 4.91992 13.6738 8.06445C13.6738 11.209 11.1445 13.7383 8 13.7383ZM7.62402 10.6348C7.79492 10.915 8.20508 10.9287 8.37598 10.6348L10.666 6.73145C10.8574 6.41016 10.7002 6.04102 10.3652 6.04102H5.62793C5.29297 6.04102 5.14941 6.43066 5.32031 6.73145L7.62402 10.6348Z"
              ></path>
            </svg>
            <div class="string-text">Статус</div>
          </div>
          <div class="string-right string-text-2">Разработка</div>
        </div>
        <div class="modal-content__table--string">
          <div class="string-left">
            <svg viewBox="0 0 16 16" class="typesMultipleSelect">
              <path
                d="M1.91602 4.83789C2.44238 4.83789 2.87305 4.40723 2.87305 3.87402C2.87305 3.34766 2.44238 2.91699 1.91602 2.91699C1.38281 2.91699 0.952148 3.34766 0.952148 3.87402C0.952148 4.40723 1.38281 4.83789 1.91602 4.83789ZM5.1084 4.52344H14.3984C14.7607 4.52344 15.0479 4.23633 15.0479 3.87402C15.0479 3.51172 14.7607 3.22461 14.3984 3.22461H5.1084C4.74609 3.22461 4.45898 3.51172 4.45898 3.87402C4.45898 4.23633 4.74609 4.52344 5.1084 4.52344ZM1.91602 9.03516C2.44238 9.03516 2.87305 8.60449 2.87305 8.07129C2.87305 7.54492 2.44238 7.11426 1.91602 7.11426C1.38281 7.11426 0.952148 7.54492 0.952148 8.07129C0.952148 8.60449 1.38281 9.03516 1.91602 9.03516ZM5.1084 8.7207H14.3984C14.7607 8.7207 15.0479 8.43359 15.0479 8.07129C15.0479 7.70898 14.7607 7.42188 14.3984 7.42188H5.1084C4.74609 7.42188 4.45898 7.70898 4.45898 8.07129C4.45898 8.43359 4.74609 8.7207 5.1084 8.7207ZM1.91602 13.2324C2.44238 13.2324 2.87305 12.8018 2.87305 12.2686C2.87305 11.7422 2.44238 11.3115 1.91602 11.3115C1.38281 11.3115 0.952148 11.7422 0.952148 12.2686C0.952148 12.8018 1.38281 13.2324 1.91602 13.2324ZM5.1084 12.918H14.3984C14.7607 12.918 15.0479 12.6309 15.0479 12.2686C15.0479 11.9062 14.7607 11.6191 14.3984 11.6191H5.1084C4.74609 11.6191 4.45898 11.9062 4.45898 12.2686C4.45898 12.6309 4.74609 12.918 5.1084 12.918Z"
              ></path>
            </svg>
            <div class="string-text">Тип</div>
          </div>
          <div class="string-right string-text-2">{{ type }}</div>
        </div>
        <div class="modal-content__table--string add-property">
          <div class="string-left">
            <svg viewBox="0 0 16 16" class="plus">
              <path
                d="M7.977 14.963c.407 0 .747-.324.747-.723V8.72h5.362c.399 0 .74-.34.74-.747a.746.746 0 00-.74-.738H8.724V1.706c0-.398-.34-.722-.747-.722a.732.732 0 00-.739.722v5.529h-5.37a.746.746 0 00-.74.738c0 .407.341.747.74.747h5.37v5.52c0 .399.332.723.739.723z"
              ></path>
            </svg>
            <div class="string-text">Add property</div>
          </div>
        </div>
        <div class="div"></div>
        <div class="comments__div">
          <div class="comments"></div>
          <input class="comments__input" placeholder="Add a comment..." />
          <div class="comment__div--line"></div>
        </div>
      </div>
    </slot>
  </modal-window>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AppField from "@/components/AppField.vue";
import useTasks from "@/composables/useTasks";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import modalWindow from "@/components/ModalWindow.vue";
import { Task } from "@/types";

const { tasks, getCards, newCard, redact } = useTasks();

// eslint-disable-next-line no-unused-vars
const title = ref<string>("");
const isDone = ref<boolean>(false);
const type = ref<string>("sss5");
const priority = ref<string>("normal");
const dateModel = ref<string[]>([]);
const startDate = ref<string>(new Date().toISOString());
const endDate = ref<string>(new Date().toISOString());

const dats = ref<string[]>([]);

let modalValue = ref(false);

const clickOnCheckbox = () => {
  isDone.value = !isDone.value;
};

const createCard = () => {
  watch(modalValue, () =>
    newCard(
      title.value,
      isDone.value,
      priority.value,
      type.value,
      startDate.value,
      endDate.value
    ).then(getCards)
  );
};

const changeCheckbox = (id) => {
  redact(
    id,
    title.value,
    isDone.value,
    priority.value,
    type.value,
    startDate.value,
    endDate.value
  ).then(getCards);
};

getCards();

const renderingCards = (): void => {
  for (let i = -14; i < 14; i++) {
    const date = new Date();

    date.setDate(date.getDate() + i);
    dats.value.push(date.toISOString().slice(0, 11));
  }
};
renderingCards();

const getFieldTasks = (date: string): Task[] => {
  return tasks.value.filter(
    (task) =>
      task.startDate.slice(0, 11) <= date && date <= task.endDate.slice(0, 11)
  );
};

const modalOpenRedact = (id) => {
  watch(modalValue, () =>
    redact(
      id,
      title.value,
      isDone.value,
      priority.value,
      type.value,
      startDate.value,
      endDate.value
    ).then(getCards)
  );
};

const modalClose = () => {
  modalValue.value = false;
};
const modalOpen = () => {
  modalValue.value = true;
};
</script>

<style lang="scss">
.div {
  width: 100%;
  height: 1px;
  background: rgba(55, 53, 47, 0.09);
  margin-bottom: 8px;
}
.collectionSearch {
  margin-top: 0px;
  width: 16px;
  display: block;
  fill: rgba(55, 53, 47, 0.65);
  flex-shrink: 0;
  backface-visibility: hidden;
}
.dots {
  margin-top: 2px;
  height: 5px;
  display: block;
  fill: rgba(55, 53, 47, 0.65);
  flex-shrink: 0;
  backface-visibility: hidden;
}
.chevronDown {
  width: 10px;
  height: 100%;
  display: block;
  fill: white;
  flex-shrink: 0;
  backface-visibility: hidden;
  margin-top: 2px;
}
.month-switch__arrow-left--svg {
  width: 20px;
  height: 20px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}
.content {
  margin-left: 100px;
  margin-right: 100px;

  &-menu__fn {
    box-shadow: rgb(233 233 231) 0px -1px 0px inset;
    display: flex;
    justify-content: end;

    &__container {
      display: flex;
      gap: 5px;
      align-items: center;

      &--field {
        padding: 5px 5px 5px 5px;
        color: #a2a2a2;
        font-size: 18px;
        margin-bottom: 7px;
        border-radius: 5px;
      }
    }
  }
}
.filter:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}
.search:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}
.sort {
  color: rgb(35, 131, 226);
}
.sort:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}
.data:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}
.new {
  border-radius: 3px;
  color: white;
  background-color: rgb(35, 131, 226);
  width: 60px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
  margin-right: 0px;
  margin-left: 5px;
}
.new:hover {
  background-color: #6982f5;
  transition: 0.1s;
}
.new__arrow {
  color: white;
  background-color: rgb(35, 131, 226);
  width: 30px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
  margin-left: 0px;
  border-radius: 3px;
}
.new__arrow:hover {
  background-color: #6982f5;
  transition: 0.1s;
}

.calendar-data {
  font-weight: 600;
  margin-left: 8px;
  margin-right: 8px;
  line-height: 1;
  font-size: 18px;
  margin-top: 15px;
}
.data__container {
  display: flex;
  justify-content: flex-start;
}
.data-switch__container {
  display: flex;
  justify-content: space-between;

  .month-switch {
    display: flex;
    justify-content: space-between;

    &__text {
      font-size: 20px;
      margin-top: 13px;
      width: 70px;
      height: 30px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #a2a2a2;
    }
    &__text:hover {
      background-color: #eeeeee;
      transition: 0.1s;
    }
    &__arrow-left:hover {
      background-color: #eeeeee;
      transition: 0.1s;
    }
    &__arrow-right:hover {
      background-color: #eeeeee;
      transition: 0.1s;
    }
    &__arrow-left {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 30px;
      height: 30px;
      margin-top: 13px;
      border-radius: 5px;
    }
    &__arrow-right {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 30px;
      height: 30px;
      margin-top: 13px;
      border-radius: 5px;
    }
  }
}
.calendar {
  display: flex;
  flex-direction: column;

  &-header {
    display: flex;
    justify-content: space-between;
    margin: 20px 48px 0;
    color: rgba(55, 53, 47, 0.5);
    box-shadow: rgb(233 233 231) 0px 1px 0px;

    .mouth_sun {
      margin-left: 99px;
    }
    .mouth_sat {
      margin-right: 120px;
    }
    .mouth {
      margin-bottom: 5px;
    }
  }
  &__container {
    align-items: center;
    display: flex;
    flex-direction: column;

    &__days {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-column: 7;
      grid-row: auto;
      box-shadow: rgb(233 233 231) -1px 0px 0px;
      margin-top: 1px;
      overflow: hidden;
    }
  }
}
.modal-content {
  &__title {
    margin-bottom: 15px;
    color: black;
    max-width: 100%;
    width: 75%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    margin-left: 130px;
    margin-top: 50px;
  }
  &__input {
    max-width: 100%;
    width: 100%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    padding: 3px 2px;
    color: black;
    height: 50px;
    font-size: 40px;
    font-weight: 700;
    border: none;
    outline: none;
  }
  &__input::placeholder {
    font-size: 40px;
    font-weight: 700;
    color: #d7d7d7;
  }
  &__table {
    margin-top: 5px;
    padding-left: calc(126px + env(safe-area-inset-left));
    padding-right: calc(126px + env(safe-area-inset-right));
    max-width: 100%;
    width: 100%;

    .add-property {
      margin-top: 15px;
      margin-bottom: 10px;
      width: 175px;
    }

    &--string {
      display: flex;
      padding-bottom: 4px;
      width: 100%;

      .string-left {
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0px 6px;
        height: 40px;
        width: 215px;
        margin-right: 10px;
        border-radius: 5px;
      }
      .string-left:hover {
        background-color: #eeeeee;
        transition: 0.1s;
      }
      .string-right {
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 5px;
        width: 100%;
        padding: 6px 8px 5px;
        font-size: 14px;
        overflow: hidden;
        height: 40px;
      }
      .string-right:hover {
        background-color: #eeeeee;
        transition: 0.1s;
      }

      .string-text {
        color: #a2a2a2;
        font-size: 18px;
        padding-left: 8px;
      }
      .string-text-2 {
        color: black;
        font-size: 18px;
        padding-left: 8px;
      }
    }
  }
}
.arrows:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.comments__div {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .comments__input {
    border-radius: 5px;
    width: 100%;
    border: none;
    outline: none;
    height: 40px;
    margin-bottom: 15px;
    color: black;
    font-size: 18px;
    padding-left: 8px;
  }
  .comments__input::placeholder {
    color: #a2a2a2;
    font-size: 18px;
    padding-left: 8px;
  }
  .comments__input:hover {
    background-color: #eeeeee;
    transition: 0.2s;
  }
}

.container--data {
  width: 100%;
  padding: 6px 8px 5px;

  .startData {
    width: 100%;
    overflow: hidden;
    border: none;
    outline: none;
    border-radius: 3px;
  }

  .endData {
    overflow: hidden;
    border: none;
    outline: none;
    border-radius: 3px;
  }
}

.typesDate {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.typesCheckbox {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.typesSelect {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.typesMultipleSelect {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.plus {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.35);
  flex-shrink: 0;
  backface-visibility: hidden;
  margin-right: 3px;
  margin-top: 1px;
}

.comment__div--line {
  width: 100%;
  height: 1px;
  background: rgba(55, 53, 47, 0.09);
  margin-bottom: 8px;
}

.checkbox {
  width: 25px;
  height: 25px;
}
</style>
