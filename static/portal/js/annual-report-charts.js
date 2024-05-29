/* highcharts.js */

import {
  date1_18,
  data1_18_1,
  data1_18_2,
  data1_18_3,
  date1_19,
  data1_19_1,
  data1_19_2,
  data1_19_3,
  date1_20,
  data1_20_1,
  data1_20_2,
  date1_21,
  data1_21_1,
  data1_21_2,
  data1_21_3,
  data1_21_4,
  data1_21_5,
  date1_22,
  data1_22_1,
  data1_22_2,
  data1_22_3,
  date1_23,
  data1_23_1,
  data1_23_2,
  data1_23_3,
  date1_24,
  data1_24_1,
  data1_24_2,
  date1_25,
  data1_25_1,
  data1_25_2,
  date1_27,
  data1_27_1,
  data1_27_2,
  data1_27_3,
  date2_2,
  data2_2_1,
  date2_3,
  data2_3_1,
  data2_3_2,
} from "./annual-report-charts-data.js";

// 차트 내 툴팁 위치 지정 및 클릭 이벤트
$(document).ready(function () {
  function updateTooltipPosition(btn, tooltip) {
    var btnOffset = btn.offset();
    var btnWidth = btn.outerWidth();
    var tooltipWidth = 360;

    // 툴팁이 뷰포트를 벗어나지 않도록 조정
    var conLeft = btnOffset.left + btnWidth / 2 - tooltipWidth / 2;
    if ($(window).width() <= 400) {
      conLeft = Math.max(
        10,
        Math.min(conLeft, $(window).width() - tooltipWidth - 10)
      );
    } else {
      if (conLeft < 10) {
        conLeft = 10;
      } else if (conLeft + tooltipWidth > $(window).width() - 10) {
        conLeft = $(window).width() - tooltipWidth - 10;
      }
    }

    // 툴팁을 버튼 하단에 위치하도록 설정
    var conTop = btnOffset.top + btn.outerHeight() + 8;
    tooltip.css({ top: conTop, left: conLeft, position: "absolute" });
  }

  $("[id^='tooltip-chart-btn']").on("click", function (e) {
    e.preventDefault();
    var btn = $(this);
    var tooltipId = btn.attr("id").replace("tooltip-chart-btn", "");
    var tooltip = $("#tooltip-chart" + tooltipId).attr("tabindex", "0");
    tooltip.toggle();

    if (tooltip.is(":visible")) {
      btn.attr("aria-expanded", "true");
    } else {
      btn.attr("aria-expanded", "false");
    }

    if (tooltip.hasClass("annual-report-tooltip")) {
      updateTooltipPosition(btn, tooltip);

      $("body").append(tooltip);
      tooltip.attr("tabindex", "0").focus();
    }
  });

  // 뷰포트 크기 변경을 감지, 활성화된 툴팁의 위치를 조정
  $(window).resize(function () {
    $("[id^='tooltip-chart-btn'].active").each(function () {
      var btn = $(this);
      var tooltipId = btn.attr("id").replace("tooltip-chart-btn", "");
      var tooltip = $("#tooltip-chart" + tooltipId);
      if (tooltip.length > 0) {
        updateTooltipPosition(btn, tooltip);
      }
    });
  });

  $(".btn-close-tooltip").on("click", function () {
    var tooltipId = $(this).closest("[id^='tooltip-chart']").attr("id");

    if (tooltipId) {
      tooltipId = tooltipId.replace("tooltip-chart", "");
      var btn = $("#tooltip-chart-btn" + tooltipId);
      $(this).closest("[id^='tooltip-chart']").toggle();
      $(".tooltip-btn").removeClass("active");
      btn.attr("aria-expanded", "false");
      btn.focus();
    }
  });
});

// chart 공통 옵션 적용
var chartOptions = {
  chart: {
    marginRight: 5,
    style: {
      fontFamily:
        '"Spoqa Han Sans Neo", "AppleGothic", "맑은 고딕", "돋움", "dotum", Helvetica, Arial, sans-serif',
      color: "#000000",
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 400,
        },
        chartOptions: {
          legend: {
            y: -15,
          },
        },
      },
    ],
  },
  title: {
    text: null,
  },
  xAxis: {
    labels: {
      style: {
        color: "#000000",
        fontSize: "0.875rem",
      },
      useHTML: true,
    },
  },
  yAxis: {
    title: {
      rotation: 0, // 텍스트를 가로 방향으로 회전
      textAlign: "left", // 텍스트를 왼쪽으로 정렬
      style: {
        color: "#000000",
        fontSize: "0.875rem",
      },
    },
    labels: {
      style: {
        color: "#000000",
        fontSize: "0.875rem",
      },
    },
    opposite: false, // 좌측에 위치
    gridLineColor: "#D3D3D3", // 그리드 라인 색상 설정
    gridLineDashStyle: "Dash",
    plotLines: [
      {
        color: "#000000",
      },
    ],
  },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "{series.name} : {point.y}",
  },
  legend: {
    align: "center", // 가운데 정렬
    verticalAlign: "top", // 상단 정렬
    layout: "horizontal", // 가로 배치
    padding: 10, // 전체 패딩
    itemStyle: {
      // 각 항목 스타일
      fontWeight: "normal",
      fontSize: "0.875rem",
      color: "#000000",
    },
    itemDistance: 14, // 항목 간 간격
    shadow: false,
    useHTML: true,
  },
  credits: {
    enabled: false, // 크레딧 비활성화
  },
  plotOptions: {
    series: {
      events: {
        legendItemClick: function () {
          return false;
        },
      },
    },
  },
};
// Data 많을 경우 적용
function getData(dates, data, isRange) {
  const arr = [];

  for (let i = 0; i < data.length; i++) {
    let dateString = String(dates[i]);
    let year = parseInt(dateString.substring(0, 4), 10);
    let month = parseInt(dateString.substring(4, 6), 10) - 1;
    let day = parseInt(dateString.substring(6, 8), 10);
    let date = new Date(Date.UTC(year, month, day));

    let x = date.getTime(); // UTC 타임스탬프

    if (isRange && Array.isArray(data[i]) && data[i].length === 2) {
      // arearange 타입에 맞는 데이터 형식으로 변환 ([x, low, high])
      arr.push([x, data[i][0], data[i][1]]);
    } else {
      // 기본적인 [x, y] 형태의 데이터
      arr.push([x, data[i]]);
    }
  }

  return arr;
}

/* 그림 Ⅰ- 1. 세계경제 성장률 추이 */
Highcharts.chart(
  "chart1_1",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 40,
      marginTop: 50,
    },
    xAxis: {
      categories: [
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        '2023<sup style="font-size: 0.75rem;">p</sup>',
      ],
      lineColor: "#D3D3D3",
      labels: {
        formatter: function () {
          var year = parseInt(this.value, 10);
          var baseYear = 2005;
          if ((year - baseYear) % 3 === 0) {
            return this.value;
          } else {
            return "";
          }
        },
      },
      plotBands: [
        {
          from: 2,
          to: 6,
          color: "rgba(68, 170, 213, 0.2)",
          label: {
            text: "글로벌 금융위기",
            style: {
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#000000",
              zIndex: 10,
            },
            verticalAlign: "bottom",
            y: -78,
          },
        },
        {
          from: 14,
          to: 16,
          color: "rgba(68, 170, 213, 0.2)",
          label: {
            text: "코로나 19",
            style: {
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#000000",
              zIndex: 10,
            },
            verticalAlign: "bottom",
            y: -44,
          },
        },
      ],
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -158,
        x: 13,
      },
      tickPositions: [-8.0, -6.0, -4.0, -2.0, -0.0, 2.0, 4.0, 6.0, 8.0],
      gridLineDashStyle: "Dash",
      labels: {
        formatter: function () {
          return this.value.toFixed(1);
        },
      },
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.x + "</b><br/>" + this.y + "%";
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        showInLegend: false,
      },
    },
    series: [
      {
        name: "세계경제",
        color: "#145FAA",
        data: [
          4.8, 5.4, 5.6, 3.1, -0.1, 5.5, 4.3, 3.5, 3.4, 3.5, 3.4, 3.2, 3.8, 3.6,
          2.8, -2.8, 6.3, 3.5, 3.1,
        ],
      },
    ],
  })
);

/* 그림 Ⅰ- 2. 세계경제 및 주요국 성장률 */
Highcharts.chart(
  "chart1_2",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 38,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -138,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: ["세계경제", "미국", "유로지역", "일본", "중국", "인도"],
      lineColor: "#D3D3D3",
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -152,
        x: 13,
      },
      tickPositions: [-10, -6, -2, 2, 6, 10],
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        borderRadius: "25%",
      },
    },
    series: [
      {
        name: "2020년",
        data: [-2.8, -2.8, -6.1, -4.2, 2.2, -5.8],
        color: "#145FAA",
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "2021년",
        data: [6.3, 5.9, 5.6, 2.2, 8.5, 9.1],
        color: "#D2915A",
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "2022년",
        data: [3.5, 1.9, 3.4, 1.0, 3.0, 7.2],
        color: "#009B82",
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: '2023년<sup style="font-size: 0.75rem;">p</sup>',
        data: [3.1, 2.5, 0.5, 1.9, 5.2, 6.7],
        color: "#FF5541",
        tooltip: {
          valueSuffix: "%",
        },
      },
    ],
  })
);

/* 그림 Ⅰ- 3. 세계교역 신장률 */
Highcharts.chart(
  "chart1_3",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 38,
      marginTop: 50,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            yAxis: {
              title: {
                y: -158,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        '2023<sup style="font-size: 0.75rem;">p</sup>',
      ],
      lineColor: "#D3D3D3",
      labels: {
        formatter: function () {
          var year = parseInt(this.value, 10);
          var baseYear = 2014;
          if ((year - baseYear) % 3 === 0) {
            return this.value;
          } else {
            return "";
          }
        },
      },
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -170,
        x: 13,
      },
      tickPositions: [-20, -15, -10, -5, 0, 5, 10, 10, 15, 20],
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.x + "</b><br/>" + this.y + "%";
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        showInLegend: false,
      },
    },
    series: [
      {
        name: "세계교역",
        color: "#145FAA",
        data: [3.8, 2.9, 2.2, 5.6, 4.0, 1.2, -7.8, 10.9, 5.2, 0.4],
      },
    ],
  })
);

/* 그림 Ⅰ- 4. 국제유가 (월평균) */
Highcharts.chart(
  "chart1_4",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 40,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -146,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "2021년 01월",
        "2021년 02월",
        "2021년 03월",
        "2021년 04월",
        "2021년 05월",
        "2021년 06월",
        "2021년 07월",
        "2021년 08월",
        "2021년 09월",
        "2021년 10월",
        "2021년 11월",
        "2021년 12월",
        "2022년 01월",
        "2022년 02월",
        "2022년 03월",
        "2022년 04월",
        "2022년 05월",
        "2022년 06월",
        "2022년 07월",
        "2022년 08월",
        "2022년 09월",
        "2022년 10월",
        "2022년 11월",
        "2022년 12월",
        "2023년 01월",
        "2023년 02월",
        "2023년 03월",
        "2023년 04월",
        "2023년 05월",
        "2023년 06월",
        "2023년 07월",
        "2023년 08월",
        "2023년 09월",
        "2023년 10월",
        "2023년 11월",
        "2023년 12월",
      ],
      labels: {
        formatter: function () {
          if (this.value.endsWith("년 01월")) {
            return this.value.substring(0, 4);
          } else {
            return "";
          }
        },
      },
    },
    yAxis: {
      title: {
        text: "(달러/배럴)",
        y: -152,
        x: 13,
      },
      tickPositions: [40, 60, 80, 100, 120, 140],
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.x + "</b><br/>" + this.y + " 달러/배럴";
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: "두바이유",
        color: "#145FAA",
        data: [
          54.16, 60.37, 63.95, 62.37, 65.98, 70.96, 73.0, 68.85, 72.24, 81.22,
          79.8, 72.76, 83.12, 93.13, 113.11, 102.68, 108.32, 115.73, 106.49,
          97.75, 90.63, 90.59, 86.28, 76.78, 80.03, 81.21, 77.52, 83.83, 75.08,
          74.67, 80.46, 86.61, 93.08, 90.62, 83.45, 77.22,
        ],
      },
      {
        name: "브렌트유",
        color: "#D2915A",
        data: [
          55.32, 62.28, 65.7, 65.33, 68.31, 73.41, 74.29, 70.51, 74.88, 83.75,
          80.85, 74.8, 85.57, 94.1, 112.46, 105.92, 111.96, 117.5, 105.12,
          97.74, 90.57, 93.59, 90.85, 81.34, 84.0, 83.54, 79.21, 83.37, 75.69,
          74.98, 80.16, 85.1, 92.59, 88.7, 82.03, 77.32,
        ],
      },
      {
        name: "WTI",
        color: "#009B82",
        data: [
          52.1, 59.06, 62.35, 61.71, 65.18, 71.38, 72.46, 67.73, 71.56, 81.32,
          79.18, 71.53, 83.12, 91.74, 108.49, 101.78, 109.6, 114.59, 99.85,
          91.57, 83.87, 87.26, 84.78, 76.52, 78.11, 76.84, 73.37, 79.44, 71.59,
          70.23, 76.39, 81.4, 89.58, 85.57, 77.43, 72.08,
        ],
      },
    ],
  })
);

/* 그림 Ⅰ- 5. GDP 성장률 및 지출항목별 기여도 */
Highcharts.chart(
  "chart1_5",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 32,
      marginTop: 78,
    },
    xAxis: {
      categories: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        '2023<sup style="font-size: 0.75rem;">p</sup>',
      ],
      labels: {
        step: 3,
      },
      lineColor: "#D3D3D3", // xAxis의 라인 색상 변경
      lineWidth: 1, // xAxis의 라인 두께 변경
    },
    yAxis: {
      title: {
        text: "(%, %p)",
        y: -152,
        x: 13,
      },
      tickInterval: 2, // 간격 설정
      min: -4, // 최소값 설정
      max: 10, // 최대값 설정
      gridLineDashStyle: "Dash", // 그리드 라인 스타일 설정
      plotLines: [
        {
          color: "#000000", // 검정색
          width: 1, // 라인 두께
          value: 0, // y 값이 0인 지점에 라인 표시
          zIndex: 5, // 다른 그래프 위에 표시되도록 설정
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false, // 데이터 레이블 비활성화
        },
      },
    },
    series: [
      {
        name: "최종소비",
        data: [1.6, 1.7, 1.9, 1.9, 2.3, 2.0, -1.5, 2.6, 2.6, 1.1],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#00B0F0",
      },
      {
        name: "총자본형성",
        data: [1.1, 1.9, 1.9, 3.3, -0.4, -0.6, 0.3, 0.9, -0.1, 0.2],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#ED7D31",
      },
      {
        name: "수출",
        data: [1.1, 0.1, 1.0, 1.0, 1.6, 0.1, -0.7, 4.0, 1.4, 1.5],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#FFC000",
      },
      {
        name: "수입",
        data: [-0.6, -0.9, -1.9, -3.0, -0.6, 0.7, 1.1, -3.3, -1.4, -1.5],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#70AD47",
      },
      {
        name: "GDP",
        type: "line",
        yAxis: 0, // 좌측 yAxis에 맞춤
        data: [3.2, 2.8, 2.9, 3.2, 2.9, 2.2, -0.7, 4.3, 2.6, 1.4],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#000000",
      },
    ],
  })
);

/* 그림 Ⅰ- 6. 소비 증감률 및 기여도 */
Highcharts.chart(
  "chart1_6",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 32,
      marginTop: 78,
    },
    xAxis: {
      categories: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        '2023<sup style="font-size: 0.75rem;">p</sup>',
      ],
      labels: {
        step: 3,
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(%, %p)",
        y: -152,
        x: 13,
      },
      tickInterval: 2,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "민간",
        data: [2.0, 2.2, 2.6, 2.8, 3.2, 2.1, -4.8, 3.6, 4.1, 1.8],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#009B82",
      },
      {
        name: "정부",
        data: [4.3, 3.8, 4.4, 3.9, 5.3, 6.4, 5.1, 5.5, 4.0, 1.3],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#FFB937",
      },
      {
        name: "최종소비지출",
        type: "line",
        yAxis: 0,
        data: [2.5, 2.6, 3.0, 3.1, 3.7, 3.2, -2.2, 4.1, 4.1, 1.7],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#145FAA",
      },
    ],
  })
);

/* 그림 Ⅰ- 7. 투자 증감률 및 기여도 */
Highcharts.chart(
  "chart1_7",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 38,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 310,
          },
          chartOptions: {
            chart: {
              marginTop: 90,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -146,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        '2023<sup style="font-size: 0.75rem;">p</sup>',
      ],
      labels: {
        step: 3,
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(%, %p)",
        y: -152,
        x: 13,
      },
      tickInterval: 5,
      min: -10,
      max: 35,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "건설투자",
        data: [1.4, 6.9, 10.0, 7.3, -4.6, -1.7, 1.5, -1.6, -2.8, 1.3],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#009B82",
      },
      {
        name: "설비투자",
        data: [5.1, 5.1, 2.6, 16.5, -2.3, -6.6, 7.2, 9.3, -0.9, 0.5],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#FFB937",
      },
      {
        name: "지식재산생산물투자",
        data: [4.5, 2.0, 4.0, 6.5, 4.4, 3.1, 3.4, 6.1, 5.0, 1.6],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#C8C8C8",
      },
      {
        name: "총고정자본형성",
        type: "line",
        yAxis: 0,
        data: [3.1, 5.4, 6.6, 9.8, -2.2, -2.1, 3.5, 3.2, -0.5, 1.1],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#145FAA",
      },
    ],
  })
);

/* 그림 Ⅰ- 8. 수출 증감률 및 기여도 */
Highcharts.chart(
  "chart1_8",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 32,
      marginTop: 78,
    },
    xAxis: {
      categories: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      labels: {
        step: 3,
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(%, %p)",
        y: -152,
        x: 13,
      },
      tickInterval: 5,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "재화수출",
        data: [1.0, -0.3, 1.7, 3.8, 2.9, -0.9, -0.1, 9.4, 3.2, 2.7],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#009B82",
      },
      {
        name: "서비스수출",
        data: [1.1, 0.5, 0.6, -1.3, 1.1, 1.2, -1.5, 1.7, 0.3, 0.4],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#FFB937",
      },
      {
        name: "총수출",
        type: "line",
        yAxis: 0,
        data: [2.1, 0.2, 2.4, 2.5, 4.0, 0.2, -1.7, 11.1, 3.4, 3.1],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#145FAA",
      },
    ],
  })
);

/* 그림 Ⅰ- 9. GDP 성장률 및 경제활동별 기여도 */
Highcharts.chart(
  "chart1_9",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 30,
      marginTop: 100,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 354,
          },
          chartOptions: {
            chart: {
              marginTop: 140,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -122,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        '2023<sup style="font-size: 0.75rem;">p</sup>',
      ],
      labels: {
        step: 3,
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(%, %p)",
        y: -140,
        x: 13,
      },
      tickInterval: 2,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "농림어업",
        data: [0.1, 0.0, -0.1, 0.0, 0.0, 0.1, -0.1, 0.1, 0.0, 0.0],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#00B0F0",
      },
      {
        name: "제조업",
        data: [0.9, 0.5, 0.6, 1.0, 0.9, 0.3, -0.3, 1.8, 0.4, 0.3],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#ED7D31",
      },
      {
        name: "전기, 가스 및 수도사업",
        data: [0.0, 0.1, 0.0, 0.2, 0.0, 0.1, 0.1, 0.1, 0.0, 0.0],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#FFC000",
      },
      {
        name: "건설업",
        data: [0.1, 0.3, 0.5, 0.3, -0.2, -0.1, -0.1, -0.1, 0.0, 0.1],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#B4C7E7",
      },
      {
        name: "서비스업",
        data: [1.7, 1.7, 1.6, 1.4, 2.1, 1.9, -0.5, 2.2, 2.4, 1.2],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#70AD47",
      },
      {
        name: "순생산물세",
        data: [0.4, 0.3, 0.4, 0.2, 0.1, 0.1, 0.1, 0.3, -0.2, -0.2],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#264478",
      },
      {
        name: "국내총생산(시장가격)",
        type: "line",
        yAxis: 0,
        data: [3.2, 2.8, 2.9, 3.2, 2.9, 2.2, -0.7, 4.3, 2.6, 1.4],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#000000",
      },
    ],
  })
);

/* 그림 Ⅰ- 10. 산업별 취업자수 증감 */
Highcharts.chart(
  "chart1_10",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 40,
      marginTop: 78,
    },
    xAxis: {
      categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
      lineColor: "#D3D3D3", // xAxis의 라인 색상 변경
      lineWidth: 1, // xAxis의 라인 두께 변경
    },
    yAxis: {
      title: {
        text: "(만 명)",
        y: -152,
        x: 13,
      },
      tickInterval: 20, // 간격 설정
      min: -40, // 최소값 설정
      max: 100, // 최대값 설정
      gridLineDashStyle: "Dash", // 그리드 라인 스타일 설정
      plotLines: [
        {
          color: "#000000", // 검정색
          width: 1, // 라인 두께
          value: 0, // y 값이 0인 지점에 라인 표시
          zIndex: 5, // 다른 그래프 위에 표시되도록 설정
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false, // 데이터 레이블 비활성화
        },
      },
    },
    series: [
      {
        name: "제조업",
        data: [-5.6, -8.1, -5.3, -0.8, 13.5, -4.3],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#00B0F0",
      },
      {
        name: "서비스업",
        data: [5.2, 34.8, -21.6, 29.2, 57.5, 38.5],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#ED7D31",
      },
      {
        name: "건설업",
        data: [4.7, -1.5, -0.4, 7.4, 3.3, -0.9],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#FFC000",
      },
      {
        name: "농림어업",
        data: [6.2, 5.5, 5.0, 1.3, 6.7, -1.3],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#70AD47",
      },
      {
        name: "기타",
        data: [-0.6, -0.7, 0.4, -0.3, 0.6, 0.7],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#AFABAB",
      },
      {
        name: "전산업",
        type: "line",
        yAxis: 0, // 좌측 yAxis에 맞춤
        data: [9.7, 30.1, -21.8, 36.9, 81.6, 32.7],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#000000",
        dataLabels: {
          enabled: true, // 데이터 레이블 활성화
          format: "{y}", // 이 형식을 사용하여 레이블 표시 (기본적으로 y 값)
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000", // 레이블의 색상 설정
            textOutline: "none", // 레이블의 테두리 없애기
          },
          y: -7,
        },
      },
    ],
  })
);

/* 그림 Ⅰ- 11. 종사상지위별 취업자수 증감 */
Highcharts.chart(
  "chart1_11",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 40,
      marginTop: 78,
    },
    xAxis: {
      categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
      lineColor: "#D3D3D3", // xAxis의 라인 색상 변경
      lineWidth: 1, // xAxis의 라인 두께 변경
    },
    yAxis: {
      title: {
        text: "(만 명)",
        y: -152,
        x: 13,
      },
      tickInterval: 20, // 간격 설정
      gridLineDashStyle: "Dash", // 그리드 라인 스타일 설정
      plotLines: [
        {
          color: "#000000", // 검정색
          width: 1, // 라인 두께
          value: 0, // y 값이 0인 지점에 라인 표시
          zIndex: 5, // 다른 그래프 위에 표시되도록 설정
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false, // 데이터 레이블 비활성화
        },
      },
    },
    series: [
      {
        name: "상용근로자",
        data: [34.5, 44.4, 30.5, 36.6, 80.5, 47.8],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#00B0F0",
      },
      {
        name: "임시근로자",
        data: [-14.1, -5.6, -31.3, 15.2, 4.3 - 6.1],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#ED7D31",
      },
      {
        name: "일용근로자",
        data: [-5.4, -3.1, -10.1, -9.6, -10.0, -9.0],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#FFC000",
      },
      {
        name: "임금근로자",
        type: "line",
        yAxis: 0, // 좌측 yAxis에 맞춤
        data: [15.0, 35.7, -10.8, 42.1, 74.9, 32.7],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#009B82",
        dataLabels: {
          enabled: true, // 데이터 레이블 활성화
          format: "{y:.1f}", // 이 형식을 사용하여 레이블 표시 (기본적으로 y 값)
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000", // 레이블의 색상 설정
            textOutline: "none", // 레이블의 테두리 없애기
          },
          y: -11,
        },
        marker: {
          fillColor: "#FFFFFF", // 마커의 채움 색상을 흰색으로 설정
          lineWidth: 2, // 마커의 테두리 선 두께
          lineColor: null, // 마커 테두리 색상을 시리즈 색상과 같게 설정
        },
      },
      {
        name: "비임금근로자",
        type: "line",
        yAxis: 0,
        data: [-5.2, -5.6, -11.0, -5.3, 6.8, 0.0],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#D2915A",
        dataLabels: {
          enabled: true,
          format: "{y:.1f}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
          y: 36,
        },
        marker: {
          fillColor: "#FFFFFF",
          lineWidth: 2,
          lineColor: null,
        },
      },
    ],
  })
);

/* 그림 Ⅰ- 12. 연령별 취업자수 증감 */
Highcharts.chart(
  "chart1_12",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 40,
      marginTop: 78,
    },
    xAxis: {
      categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(만 명)",
        y: -152,
        x: 13,
      },
      tickInterval: 20,
      min: -60,
      max: 100,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "15~29세",
        data: [-0.3, 4.1, -18.3, 11.5, 11.9, -9.8],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#00B0F0",
      },
      {
        name: "30~59세",
        data: [-13.4, -11.7, -41.1, -7.6, 24.6, 5.9],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#ED7D31",
      },
      {
        name: "60세 이상",
        data: [23.4, 37.7, 37.5, 33.0, 45.2, 36.6],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#FFC000",
      },
      {
        name: "전체",
        type: "line",
        yAxis: 0,
        data: [9.7, 30.1, -21.8, 36.9, 81.6, 32.7],
        tooltip: {
          valueSuffix: "만 명",
        },
        color: "#000000",
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
          y: -7,
        },
      },
    ],
  })
);

/* 그림 Ⅰ- 13. 종사상지위별 임금상승률 */
Highcharts.chart(
  "chart1_13",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 32,
      marginTop: 78,
    },
    xAxis: {
      categories: [
        "전체근로자임금",
        "상용근로자임금",
        "상용직정액급여",
        "상용직초과급여",
        "상용직특별급여",
        "임시일용근로자",
      ],
      lineColor: "#D3D3D3",
      plotBands: [
        {
          from: -1,
          to: 0.5,
          color: "#D3F0F9",
        },
        {
          from: 0.5,
          to: 4.5,
          color: "#FFF1D7",
        },
        {
          from: 4.5,
          to: 5.5,
          color: "#E6EEEE",
        },
      ],
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -152,
        x: 13,
      },
      tickPositions: [-5, 0, 5, 10, 15],
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        borderRadius: "25%",
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "2022년",
        data: [4.9, 5.2, 4.3, 5.7, 10.4, 2.8],
        color: "#00B0F0",
        tooltip: {
          valueSuffix: "%",
        },
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
      },
      {
        name: "2023년",
        data: [2.5, 2.8, 3.8, 3.3, -2.9, 2.2],
        color: "#ED7D31",
        tooltip: {
          valueSuffix: "%",
        },
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
      },
    ],
  })
);

/* 그림 Ⅰ- 14. 주요 물가 지표 */
Highcharts.chart(
  "chart1_14",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 30,
      marginTop: 100,
      marginRight: 40,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 314,
          },
          chartOptions: {
            chart: {
              marginTop: 110,
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      categories: (function () {
        var categories = [];
        for (var year = 2019; year <= 2023; year++) {
          for (var month = 1; month <= 12; month++) {
            var monthStr =
              month < 10 ? "0" + month.toString() : month.toString();
            categories.push(year + "." + monthStr);
          }
        }
        return categories;
      })(),
      lineColor: "#D3D3D3",
      labels: {
        formatter: function () {
          var yearOnly = this.value.split(".")[0];
          var allowedYears = ["2019", "2020", "2021", "2022", "2023"];
          if (
            allowedYears.indexOf(yearOnly) !== -1 &&
            this.value.endsWith(".01")
          ) {
            return yearOnly;
          } else {
            return "";
          }
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "(전년동월대비, %)",
          rotation: 0,
          y: -134,
          x: 63,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [-4, -2, 0, 2, 4, 6, 8],
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "",
        },
        tickPositions: [-20, -10, -0, 10, 20, 30, 40],
        opposite: true,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
    ],
    tooltip: {
      formatter: function () {
        return "<b>" + this.x + "</b><br/>" + this.y + " 전년동월대비, %";
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "소비자물가(좌축)",
        color: "#145FAA",
        data: [
          0.8, 0.5, 0.4, 0.6, 0.7, 0.7, 0.6, 0.0, -0.4, 0.0, 0.2, 0.7, 1.2, 0.9,
          0.8, 0.0, -0.2, 0.2, 0.4, 0.8, 0.9, 0.1, 0.6, 0.6, 0.9, 1.4, 1.9, 2.5,
          2.6, 2.3, 2.6, 2.6, 2.4, 3.2, 3.8, 3.7, 3.8, 3.8, 4.2, 4.8, 5.3, 6.0,
          6.3, 5.7, 5.5, 5.6, 5.0, 5.0, 5.0, 4.7, 4.2, 3.7, 3.4, 2.7, 2.4, 3.4,
          3.7, 3.8, 3.3, 3.2,
        ],
        yAxis: 0,
      },
      {
        name: "식료품·에너지 제외(좌축)",
        color: "#D2915A",
        data: [
          1.0, 1.1, 0.7, 0.7, 0.6, 0.7, 0.9, 0.8, 0.5, 0.6, 0.5, 0.6, 0.6, 0.4,
          0.2, 0.1, 0.2, 0.4, 0.3, 0.4, 0.6, -0.3, 0.6, 0.6, 0.7, 0.6, 1.1, 1.2,
          1.2, 1.1, 1.3, 1.3, 1.4, 2.3, 1.9, 2.2, 2.6, 2.9, 2.8, 3.0, 3.4, 3.9,
          4.0, 4.1, 4.1, 4.2, 4.2, 4.0, 4.0, 3.9, 4.0, 3.9, 3.8, 3.3, 3.2, 3.1,
          3.1, 3.1, 2.9, 2.8,
        ],
        yAxis: 0,
      },
      {
        name: "생산자물가(우축)",
        color: "#009B82",
        data: [
          0.4, 0.1, 0.5, 0.6, 0.4, 0.1, -0.3, -0.6, -0.8, -0.7, -0.1, 0.7, 1.1,
          0.7, -0.5, -1.7, -1.8, -1.0, -0.8, -0.5, -0.4, -0.5, -0.3, 0.2, 0.9,
          2.1, 4.1, 6.0, 6.6, 6.6, 7.4, 7.4, 7.6, 9.1, 9.8, 9.0, 8.9, 8.5, 9.0,
          9.7, 9.9, 10.0, 9.2, 8.2, 7.9, 7.3, 6.2, 5.8, 5.1, 4.8, 3.3, 1.6, 0.5,
          -0.3, -0.3, 1.0, 1.4, 0.7, 0.6, 1.2,
        ],
        yAxis: 1,
      },
      {
        name: "수입물가(우축)",
        color: "#FF5541",
        data: [
          1.7, 3.5, 4.7, 5.4, 4.5, -0.6, -1.1, -0.2, -2.0, -6.0, -2.1, 3.3, 2.7,
          -1.0, -7.9, -14.6, -13.0, -7.4, -8.9, -10.5, -11.3, -11.2, -10.3,
          -9.9, -5.8, -0.3, 9.0, 15.3, 14.2, 14.4, 19.5, 22.4, 26.6, 36.3, 35.0,
          29.6, 30.5, 30.7, 35.9, 35.4, 36.5, 33.6, 25.6, 22.9, 24.2, 19.4,
          14.0, 8.7, 1.9, -0.7, -6.9, -6.0, -12.3, -16.1, -13.6, -9.2, -9.6,
          -9.9, -8.8, -4.0,
        ],
        yAxis: 1,
      },
    ],
  })
);

/* 그림 Ⅰ- 15. 소비자물가 상승률 및 품목별 기여도 */
Highcharts.chart(
  "chart1_15",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 30,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 316,
          },
          chartOptions: {
            chart: {
              marginTop: 120,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -130,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      categories: ["2019", "2020", "2021", "2022", "2023"],
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(%, %p)",
        y: -152,
        x: 12,
      },
      tickInterval: 1,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "농축수산물",
        data: [-0.1, 0.5, 0.7, 0.3, 0.2],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#FFC000",
      },
      {
        name: "공업제품",
        data: [-0.1, -0.1, 0.8, 2.4, 0.9],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#92D050",
      },
      {
        name: "전기·가스·수도",
        data: [0.1, -0.1, -0.1, 0.4, 0.7],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#5B9BD5",
      },
      {
        name: "서비스",
        data: [0.5, 0.1, 1.0, 2.0, 1.8],
        tooltip: {
          valueSuffix: "%p",
        },
        color: "#ED7D31",
      },
      {
        name: "소비자물가",
        type: "line",
        yAxis: 0,
        data: [0.4, 0.5, 2.5, 5.1, 3.6],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#000000",
        dataLabels: {
          enabled: true,
          format: "{y:.1f}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
          y: -11,
        },
        marker: {
          fillColor: "#FFFFFF",
          lineWidth: 2,
          lineColor: null,
        },
      },
      {
        name: "식료품·에너지 제외",
        type: "line",
        yAxis: 0,
        data: [0.7, 0.4, 1.4, 3.6, 3.4],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#145FAA",
        dashStyle: "Dash",
        marker: {
          fillColor: "#FFFFFF",
          lineWidth: 2,
          lineColor: null,
        },
      },
    ],
  })
);

/* 그림 Ⅰ- 16. 경상수지 */
Highcharts.chart(
  "chart1_16",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 50,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 290,
          },
          chartOptions: {
            chart: {
              marginTop: 90,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -138,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      labels: {
        formatter: function () {
          var year = parseInt(this.value, 10);
          var baseYear = 2005;
          if ((year - baseYear) % 5 === 0 || year === 2023) {
            return this.value;
          } else {
            return "";
          }
        },
      },
      lineColor: "#D3D3D3", // xAxis의 라인 색상 변경
      lineWidth: 1, // xAxis의 라인 두께 변경
    },
    yAxis: {
      title: {
        text: "(억 달러)",
        y: -148,
        x: 13,
      },
      tickInterval: 300, // 간격 설정
      gridLineDashStyle: "Dash", // 그리드 라인 스타일 설정
      labels: {
        formatter: function () {
          return Highcharts.numberFormat(this.value, 0, "", ",");
        },
      },
      plotLines: [
        {
          color: "#000000", // 검정색
          width: 1, // 라인 두께
          value: 0, // y 값이 0인 지점에 라인 표시
          zIndex: 5, // 다른 그래프 위에 표시되도록 설정
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false, // 데이터 레이블 비활성화
        },
      },
    },
    series: [
      {
        name: "상품수지",
        data: [
          324.9, 245.2, 324.4, 117.5, 480.6, 479.3, 280.1, 485.9, 802.6, 861.5,
          1202.8, 1164.6, 1135.9, 1100.9, 798.1, 806.0, 757.3, 156.2, 340.9,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#00B0F0",
      },
      {
        name: "서비스수지",
        data: [
          -89.8, -130.4, -130.4, -63.1, -93.4, -139.7, -120.6, -50.6, -63.3,
          -32.9, -146.3, -173.4, -367.3, -293.7, -268.5, -146.7, -52.9, -72.5,
          -256.6,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#ED7D31",
      },
      {
        name: "본원소득수지",
        data: [
          -80.4, -50.0, -45.4, -24.2, -34.4, -6.9, 54.0, 107.3, 75.2, 51.6,
          44.5, 45.7, 53.4, 49.0, 128.6, 134.9, 194.4, 203.5, 316.1,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#FFC000",
      },
      {
        name: "이전소득수지",
        data: [
          -32.6, -43.8, -43.9, -12.7, -22.0, -53.2, -47.2, -54.7, -41.9, -49.9,
          -49.9, -57.7, -69.6, -81.5, -61.5, -35.2, -46.6, -28.9, -45.5,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#70AD47",
      },
      {
        name: "경상수지",
        type: "line",
        yAxis: 0, // 좌측 yAxis에 맞춤
        data: [
          122.1, 21.0, 104.7, 17.5, 330.9, 279.5, 166.4, 487.9, 772.6, 830.3,
          1051.2, 979.2, 752.3, 774.7, 596.8, 759.0, 852.3, 258.3, 354.9,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#000000",
      },
    ],
  })
);

/* 그림 Ⅰ- 17. 서비스수지 */
Highcharts.chart(
  "chart1_17",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 46,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            chart: {
              marginTop: 90,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -140,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      labels: {
        formatter: function () {
          var year = parseInt(this.value, 10);
          var baseYear = 2005;
          if ((year - baseYear) % 5 === 0 || year === 2023) {
            return this.value;
          } else {
            return "";
          }
        },
      },
      lineColor: "#D3D3D3", // xAxis의 라인 색상 변경
      lineWidth: 1, // xAxis의 라인 두께 변경
    },
    yAxis: {
      title: {
        text: "(억 달러)",
        y: -146,
        x: 13,
      },
      tickInterval: 100,
      max: 300,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000", // 검정색
          width: 1, // 라인 두께
          value: 0, // y 값이 0인 지점에 라인 표시
          zIndex: 5, // 다른 그래프 위에 표시되도록 설정
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "가공서비스수지",
        data: [
          -5.9, -13.6, -20.7, -31.4, -44.6, -47.4, -72.5, -66.5, -57.1, -56.4,
          -61.0, -57.6, -69.6, -73.2, -76.1, -52.6, -61.2, -62.1, -67.9,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#5B9BD5",
      },
      {
        name: "운송수지",
        data: [
          31.7, 21.5, 39.8, 75.1, 48.2, 86.6, 63.3, 101.3, 73.4, 61.9, 46.5,
          -13.3, -54.2, -25.1, -17.3, 11.0, 128.8, 131.0, -15.5,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#A5A5A5",
      },
      {
        name: "여행수지",
        data: [
          -96.1, -130.9, -158.5, -93.2, -52.6, -85.0, -75.6, -73.7, -72.6,
          -57.3, -104.7, -103.6, -183.2, -165.7, -118.7, -58.2, -70.3, -83.7,
          -125.3,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#FF0000",
      },
      {
        name: "건설수지",
        data: [
          38.3, 57.0, 78.7, 110.8, 117.5, 96.8, 116.8, 163.5, 155.2, 152.9,
          96.4, 95.6, 78.8, 97.2, 67.8, 58.6, 42.7, 48.4, 45.0,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#70AD47",
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn1">기타<sup class="sup">1)</sup></a>',
        data: [
          -57.9, -64.3, -69.6, -124.4, -161.8, -190.6, -152.6, -175.1, -162.3,
          -134.0, -123.5, -94.5, -139.1, -126.9, -124.0, -105.5, -92.8, -106.2,
          -93.0,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#C8C8C8",
      },
      {
        name: "서비스수지",
        type: "line",
        yAxis: 0,
        data: [
          -89.8, -130.4, -130.4, -63.1, -93.4, -139.7, -120.6, -50.6, -63.3,
          -32.9, -146.3, -173.4, -367.3, -293.7, -268.5, -146.7, -52.9, -72.5,
          -256.6,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#000000",
      },
    ],
  })
);

/* 그림 Ⅰ- 18. 주요국 국채금리 및 EMBI+ 가산금리 */
const chart1_18_1 = getData(date1_18, data1_18_1, false);
const chart1_18_2 = getData(date1_18, data1_18_2, false);
const chart1_18_3 = getData(date1_18, data1_18_3, false);
Highcharts.chart(
  "chart1_18",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 32,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 314,
          },
          chartOptions: {
            chart: {
              marginTop: 110,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -130,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 1),
      max: Date.UTC(2023, 11, 29),
      tickPositions: [
        Date.UTC(2014, 0, 1),
        Date.UTC(2017, 0, 1),
        Date.UTC(2020, 0, 1),
        Date.UTC(2023, 0, 1),
      ], // 원하는 년도만 노출
      lineColor: "#D3D3D3",
      labels: {
        format: "{value:%Y}", // 라벨 포맷을 "연도"로 설정
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -147,
        x: 10,
      },
      gridLineDashStyle: "Dash",
      tickInterval: 10,
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
      min: -2,
      max: 8,
      tickInterval: 1,
    },
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}%`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "미국 국채금리(10년)",
        color: "#145FAA",
        data: chart1_18_1,
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "독일 국채금리(10년)",
        color: "#009B82",
        data: chart1_18_2,
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "신흥국 EMBI+가산금리",
        color: "#D2915A",
        data: chart1_18_3,
        tooltip: {
          valueSuffix: "%",
        },
      },
    ],
  })
);

/* 그림 Ⅰ- 19. 주요 선진국 주가 및 MSCI 신흥국 지수 */
const chart1_19_1 = getData(date1_19, data1_19_1, false);
const chart1_19_2 = getData(date1_19, data1_19_2, false);
const chart1_19_3 = getData(date1_19, data1_19_3, false);
Highcharts.chart(
  "chart1_19",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 40,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 314,
          },
          chartOptions: {
            chart: {
              marginTop: 110,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -130,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 1),
      max: Date.UTC(2023, 11, 29),
      tickPositions: [
        Date.UTC(2014, 0, 1),
        Date.UTC(2017, 0, 1),
        Date.UTC(2020, 0, 1),
        Date.UTC(2023, 0, 1),
      ], // 원하는 년도만 노출
      labels: {
        format: "{value:%Y}", // 라벨 포맷을 "연도"로 설정
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: {
      title: {
        text: "(2014.1.1=100)",
        y: -147,
        x: 12,
      },
      gridLineDashStyle: "Dash",
      tickInterval: 10,
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
      tickInterval: 50,
    },
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "Dow Jones",
        color: "#145FAA",
        data: chart1_19_1,
      },
      {
        name: "Stoxx 유럽 600",
        color: "#D2915A",
        data: chart1_19_2,
      },
      {
        name: "MSCI 신흥국 지수",
        color: "#009B82",
        data: chart1_19_3,
      },
    ],
  })
);

/* 그림 Ⅰ- 20. 달러/유로 및 엔/달러 환율 */
const chart1_20_1 = getData(date1_20, data1_20_1, false);
const chart1_20_2 = getData(date1_20, data1_20_2, false);
Highcharts.chart(
  "chart1_20",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 34,
      marginTop: 78,
      marginRight: 42,
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 1),
      max: Date.UTC(2023, 11, 29),
      tickPositions: [
        Date.UTC(2014, 0, 1),
        Date.UTC(2017, 0, 1),
        Date.UTC(2020, 0, 1),
        Date.UTC(2023, 0, 1),
      ], // 원하는 년도만 노출
      labels: {
        format: "{value:%Y}",
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: [
      {
        reversed: true,
        title: {
          text: "(달러/유로)",
          rotation: 0,
          y: -147,
          x: 44,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5],
        opposite: false,
        gridLineWidth: 0,
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
        labels: {
          format: "{value:.1f}",
        },
      },
      {
        title: {
          text: "(엔/달러)",
          rotation: 0,
          y: -147,
          x: -36,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
        opposite: true,
        gridLineWidth: 0,
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
    ],
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        const suffix = this.series.options.tooltip.valueSuffix || "";
        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}${suffix}`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "달러/유로(좌측, 역방향)",
        color: "#145FAA",
        tooltip: {
          valueSuffix: "달러/유로",
        },
        data: chart1_20_1,
        yAxis: 0,
      },
      {
        name: "엔/달러(우측)",
        color: "#D2915A",
        tooltip: {
          valueSuffix: "엔/달러",
        },
        data: chart1_20_2,
        yAxis: 1,
      },
    ],
  })
);

/* 그림 Ⅰ- 21. 국고채 금리 및 미국 국채 금리 */
const chart1_21_1 = getData(date1_21, data1_21_1, false);
const chart1_21_2 = getData(date1_21, data1_21_2, false);
const chart1_21_3 = getData(date1_21, data1_21_3, false);
const chart1_21_4 = getData(date1_21, data1_21_4, false);
const chart1_21_5 = getData(date1_21, data1_21_5, false);
Highcharts.chart(
  "chart1_21",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 34,
      marginTop: 78,
      marginRight: 42,
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 2),
      max: Date.UTC(2023, 11, 29),
      tickPositions: [
        Date.UTC(2014, 0, 2),
        Date.UTC(2017, 0, 1),
        Date.UTC(2020, 0, 1),
        Date.UTC(2023, 0, 1),
      ], // 원하는 년도만 노출
      labels: {
        format: "{value:%Y}",
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: [
      {
        title: {
          text: "(연%)",
          rotation: 0,
          y: -147,
          x: 29,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0],
        opposite: false,
        gridLineWidth: 0,
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
        labels: {
          format: "{value:.1f}",
        },
      },
      {
        title: {
          text: "(%p)",
          rotation: 0,
          y: -147,
          x: -27,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [-1.0, 0.0, 1.0, 2.0, 3.0],
        opposite: true,
        gridLineWidth: 0,
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
        labels: {
          format: "{value:.1f}",
        },
      },
    ],
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        const suffix = this.series.options.tooltip.valueSuffix || "";
        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}${suffix}`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "국고채(3년)(좌축)",
        color: "#145FAA",
        tooltip: {
          valueSuffix: "연%",
        },
        data: chart1_21_1,
        yAxis: 0,
        zIndex: 1,
      },
      {
        name: "국고채(10년)(좌축)",
        color: "#23B4E1",
        tooltip: {
          valueSuffix: "연%",
        },
        data: chart1_21_2,
        yAxis: 0,
        zIndex: 1,
      },
      {
        name: "미국채(10년)(좌축)",
        color: "#D2915A",
        tooltip: {
          valueSuffix: "연%",
        },
        data: chart1_21_3,
        yAxis: 0,
        zIndex: 1,
      },
      {
        name: "기준금리(좌축)",
        color: "#FF5541",
        tooltip: {
          valueSuffix: "연%",
        },
        data: chart1_21_4,
        yAxis: 0,
        zIndex: 1,
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn2">장단기금리차(우축)<sup class="sup">1)</sup></a>',
        color: "#C8C8C8",
        tooltip: {
          valueSuffix: "%p",
        },
        data: chart1_21_5,
        yAxis: 1,
        type: "area",
        zIndex: 0,
      },
    ],
  })
);

/* 그림 Ⅰ- 22. 회사채 금리 및 신용스프레드 */
const chart1_22_1 = getData(date1_22, data1_22_1, false);
const chart1_22_2 = getData(date1_22, data1_22_2, false);
const chart1_22_3 = getData(date1_22, data1_22_3, false);
Highcharts.chart(
  "chart1_22",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 34,
      marginTop: 78,
      marginRight: 42,
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 2),
      max: Date.UTC(2023, 11, 29),
      tickPositions: [
        Date.UTC(2014, 0, 2),
        Date.UTC(2017, 0, 1),
        Date.UTC(2020, 0, 1),
        Date.UTC(2023, 0, 1),
      ], // 원하는 년도만 노출
      labels: {
        format: "{value:%Y}",
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: [
      {
        title: {
          text: "(연%)",
          rotation: 0,
          y: -147,
          x: 29,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0],
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
        labels: {
          format: "{value:.1f}",
        },
      },
      {
        title: {
          text: "(bp)",
          rotation: 0,
          y: -147,
          x: -24,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [0, 100, 200, 300, 400, 500, 600],
        opposite: true,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
    ],
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        const suffix = this.series.options.tooltip.valueSuffix || "";
        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}${suffix}`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "국고채(3년)(좌축)",
        color: "#145FAA",
        tooltip: {
          valueSuffix: "연%",
        },
        data: chart1_22_1,
        yAxis: 0,
      },
      {
        name: "회사채(3년, AA-)(좌축)",
        color: "#D2915A",
        tooltip: {
          valueSuffix: "연%",
        },
        data: chart1_22_2,
        yAxis: 0,
      },
      {
        name: "신용스프레드(우축)",
        color: "#C8C8C8",
        tooltip: {
          valueSuffix: "bp",
        },
        data: chart1_22_3,
        yAxis: 1,
        type: "area",
      },
    ],
  })
);

/* 그림 Ⅰ- 23. 주요 단기금리 */
const chart1_23_1 = getData(date1_23, data1_23_1, false);
const chart1_23_2 = getData(date1_23, data1_23_2, false);
const chart1_23_3 = getData(date1_23, data1_23_3, false);
Highcharts.chart(
  "chart1_23",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 34,
      marginTop: 78,
      marginRight: 5,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 314,
          },
          chartOptions: {
            chart: {
              marginTop: 110,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -130,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 2),
      max: Date.UTC(2023, 11, 29),
      tickPositions: [
        Date.UTC(2014, 0, 2),
        Date.UTC(2017, 0, 1),
        Date.UTC(2020, 0, 1),
        Date.UTC(2023, 0, 1),
      ], // 원하는 년도만 노출
      labels: {
        format: "{value:%Y}",
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: [
      {
        title: {
          text: "(연%)",
          rotation: 0,
          y: -147,
          x: 29,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0],
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
        labels: {
          format: "{value:.1f}",
        },
      },
    ],
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        const suffix = this.series.options.tooltip.valueSuffix || "";
        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}${suffix}`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "CP(91일물)",
        color: "#145FAA",
        tooltip: {
          valueSuffix: "연%",
        },
        data: chart1_23_1,
      },
      {
        name: "통안증권(91일)",
        color: "#23B4E1",
        tooltip: {
          valueSuffix: "연%",
        },
        data: chart1_23_2,
      },
      {
        name: "기준금리",
        color: "#FF5541",
        tooltip: {
          valueSuffix: "연%",
        },
        data: chart1_23_3,
      },
    ],
  })
);

/* 그림 Ⅰ- 24. 코스피 및 코스닥 지수 */
const chart1_24_1 = getData(date1_24, data1_24_1, false);
const chart1_24_2 = getData(date1_24, data1_24_2, false);
Highcharts.chart(
  "chart1_24",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 47,
      marginTop: 78,
      marginRight: 51,
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 2),
      max: Date.UTC(2023, 11, 28),
      tickPositions: [
        Date.UTC(2014, 0, 2),
        Date.UTC(2017, 0, 1),
        Date.UTC(2020, 0, 1),
        Date.UTC(2023, 0, 1),
      ], // 원하는 년도만 노출
      labels: {
        format: "{value:%Y}",
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: [
      {
        title: {
          text: "(1980.1.4=100)",
          rotation: 0,
          y: -147,
          x: 60,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [1000, 1500, 2000, 2500, 3000, 3500],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(1996.7.1=1,000)",
          rotation: 0,
          y: -147,
          x: -65,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [200, 500, 800, 1100, 1400, 1700],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: true,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
    ],
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        const suffix = this.series.options.tooltip.valueSuffix || "";
        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}${suffix}`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "코스피(좌축)",
        color: "#145FAA",
        tooltip: {
          valueSuffix: "(1980.1.4=100)",
        },
        data: chart1_24_1,
        yAxis: 0,
      },
      {
        name: "코스닥(우축)",
        color: "#D2915A",
        tooltip: {
          valueSuffix: "(1996.7.1=1,000)",
        },
        data: chart1_24_2,
        yAxis: 1,
      },
    ],
  })
);

/* 그림 Ⅰ- 25. 원/달러 환율 및 원화 명목실효환율 지수 */
const chart1_25_1 = getData(date1_25, data1_25_1, false);
const chart1_25_2 = getData(date1_25, data1_25_2, false);
Highcharts.chart(
  "chart1_25",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 47,
      marginTop: 78,
      marginRight: 42,
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 2),
      max: Date.UTC(2023, 11, 28),
      tickPositions: [
        Date.UTC(2014, 0, 2),
        Date.UTC(2017, 0, 1),
        Date.UTC(2020, 0, 1),
        Date.UTC(2023, 0, 1),
      ], // 원하는 년도만 노출
      labels: {
        format: "{value:%Y}",
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: [
      {
        title: {
          text: "(원)",
          rotation: 0,
          y: -147,
          x: 23,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [800, 1000, 1200, 1400, 1600],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(2020=100)",
          rotation: 0,
          y: -147,
          x: -47,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [60, 80, 100, 120, 140],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: true,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
    ],
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        const suffix = this.series.options.tooltip.valueSuffix || "";
        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}${suffix}`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "원/달러(좌축)",
        color: "#145FAA",
        tooltip: {
          valueSuffix: "원",
        },
        data: chart1_25_1,
        yAxis: 0,
      },
      {
        name: "원화 명목실효환율지수(우축)",
        color: "#D2915A",
        tooltip: {
          valueSuffix: "(2020=100)",
        },
        data: chart1_25_2,
        yAxis: 1,
      },
    ],
  })
);

/* 그림 Ⅰ- 26. 원/달러 및 주요국 환율 변동성 (연평균) */
Highcharts.chart(
  "chart1_26",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 36,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -146,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      labels: {
        step: 3,
      },
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -154,
        x: 12,
      },
      tickPositions: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0],
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
      labels: {
        format: "{value:.1f}",
      },
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.x + "</b><br/>" + this.y + "%";
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
      line: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn3">전일대비변동률<sup class="sup">1)</sup></a>',
        color: "#145FAA",
        data: [0.44, 0.5, 0.55, 0.43, 0.46, 0.4, 0.49, 0.42, 0.56, 0.55],
        type: "line",
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn4">주요국 전일대비변동률<sup class="sup">2)</sup></a>',
        color: "#D2915A",
        data: [0.44, 0.61, 0.55, 0.47, 0.48, 0.43, 0.52, 0.46, 0.61, 0.5],
        type: "line",
      },
      {
        name: "최대값과 최소값",
        color: "#FDEADA",
        data: [
          [0.5, 0.39],
          [0.69, 0.5],
          [0.64, 0.48],
          [0.52, 0.43],
          [0.58, 0.44],
          [0.5, 0.37],
          [0.61, 0.44],
          [0.53, 0.41],
          [0.8, 0.49],
          [0.65, 0.43],
        ],
        type: "arearange",
        lineWidth: 0,
        fillOpacity: 0.3,
        showInLegend: false,
        marker: {
          enabled: false,
        },
      },
    ],
  })
);

/* 그림 Ⅰ- 27. 외환스왑레이트 */
const chart1_27_1 = getData(date1_27, data1_27_1, false);
const chart1_27_2 = getData(date1_27, data1_27_2, false);
const chart1_27_3 = getData(date1_27, data1_27_3, false);
Highcharts.chart(
  "chart1_27",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 40,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 314,
          },
          chartOptions: {
            chart: {
              marginTop: 110,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -130,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 2),
      max: Date.UTC(2023, 11, 28),
      tickPositions: [
        Date.UTC(2014, 0, 2),
        Date.UTC(2017, 0, 1),
        Date.UTC(2020, 0, 1),
        Date.UTC(2023, 0, 1),
      ], // 원하는 년도만 노출
      labels: {
        format: "{value:%Y}",
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: [
      {
        title: {
          text: "(%, %p)",
          rotation: 0,
          y: -147,
          x: 36,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [-6, -4, -2, 0, 2, 4, 6],
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
        labels: {
          format: "{value:.1f}",
        },
      },
    ],
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        const suffix = this.series.options.tooltip.valueSuffix || "";
        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}${suffix}`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn5">차익거래 유인(3개월)<sup class="sup">1)</sup></a>',
        color: "#C8C8C8",
        tooltip: {
          valueSuffix: "%p",
        },
        data: chart1_27_1,
        type: "area",
      },
      {
        name: "외환스왑레이트(3개월)",
        color: "#145FAA",
        tooltip: {
          valueSuffix: "%",
        },
        data: chart1_27_2,
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn6">내외금리차(3개월)<sup class="sup">2)</sup></a>',
        color: "#D2915A",
        tooltip: {
          valueSuffix: "%",
        },
        data: chart1_27_3,
      },
    ],
  })
);

/* 그림 Ⅱ- 1. 물가안정목표와 소비자물가 상승률 */
Highcharts.chart(
  "chart2_1",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 30,
      marginTop: 50,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -146,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "2017년 01월",
        "2017년 02월",
        "2017년 03월",
        "2017년 04월",
        "2017년 05월",
        "2017년 06월",
        "2017년 07월",
        "2017년 08월",
        "2017년 09월",
        "2017년 10월",
        "2017년 11월",
        "2017년 12월",
        "2018년 01월",
        "2018년 02월",
        "2018년 03월",
        "2018년 04월",
        "2018년 05월",
        "2018년 06월",
        "2018년 07월",
        "2018년 08월",
        "2018년 09월",
        "2018년 10월",
        "2018년 11월",
        "2018년 12월",
        "2019년 01월",
        "2019년 02월",
        "2019년 03월",
        "2019년 04월",
        "2019년 05월",
        "2019년 06월",
        "2019년 07월",
        "2019년 08월",
        "2019년 09월",
        "2019년 10월",
        "2019년 11월",
        "2019년 12월",
        "2020년 01월",
        "2020년 02월",
        "2020년 03월",
        "2020년 04월",
        "2020년 05월",
        "2020년 06월",
        "2020년 07월",
        "2020년 08월",
        "2020년 09월",
        "2020년 10월",
        "2020년 11월",
        "2020년 12월",
        "2021년 01월",
        "2021년 02월",
        "2021년 03월",
        "2021년 04월",
        "2021년 05월",
        "2021년 06월",
        "2021년 07월",
        "2021년 08월",
        "2021년 09월",
        "2021년 10월",
        "2021년 11월",
        "2021년 12월",
        "2022년 01월",
        "2022년 02월",
        "2022년 03월",
        "2022년 04월",
        "2022년 05월",
        "2022년 06월",
        "2022년 07월",
        "2022년 08월",
        "2022년 09월",
        "2022년 10월",
        "2022년 11월",
        "2022년 12월",
        "2023년 01월",
        "2023년 02월",
        "2023년 03월",
        "2023년 04월",
        "2023년 05월",
        "2023년 06월",
        "2023년 07월",
        "2023년 08월",
        "2023년 09월",
        "2023년 10월",
        "2023년 11월",
        "2023년 12월",
      ],
      labels: {
        formatter: function () {
          if (this.value.endsWith("년 01월")) {
            return this.value.substring(0, 4);
          } else {
            return "";
          }
        },
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -158,
        x: 12,
      },
      tickPositions: [-1, 0, 1, 2, 3, 4, 5, 6, 7],
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
        {
          color: "#000000",
          width: 2,
          value: 2,
          dashStyle: "ShortDash",
          label: {
            text: "2.0% (물가안정목표)",
            align: "right",
            y: 18,
            x: -8,
            style: {
              color: "#000000",
            },
          },
          zIndex: 5,
        },
      ],
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.x + "</b><br/>" + this.y + " %";
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        showInLegend: false,
      },
    },
    series: [
      {
        name: "소비자물가 상승률",
        color: "#145FAA",
        data: [
          2.2, 2.1, 2.3, 2.0, 2.0, 1.8, 2.2, 2.5, 2.0, 1.8, 1.2, 1.4, 0.8, 1.3,
          1.2, 1.5, 1.5, 1.5, 1.1, 1.4, 2.1, 2.0, 2.0, 1.3, 0.8, 0.5, 0.4, 0.6,
          0.7, 0.7, 0.6, 0.0, -0.4, 0.0, 0.2, 0.7, 1.2, 0.9, 0.8, 0.0, -0.2,
          0.2, 0.4, 0.8, 0.9, 0.1, 0.6, 0.6, 0.9, 1.4, 1.9, 2.5, 2.6, 2.3, 2.6,
          2.6, 2.4, 3.2, 3.8, 3.7, 3.8, 3.8, 4.2, 4.8, 5.3, 6.0, 6.3, 5.7, 5.5,
          5.6, 5.0, 5.0, 5.0, 4.7, 4.2, 3.7, 3.4, 2.7, 2.4, 3.4, 3.7, 3.8, 3.3,
          3.2,
        ],
      },
    ],
  })
);

/* 그림 Ⅱ- 2. 기준금리 */
const chart2_2_1 = getData(date2_2, data2_2_1, false);
Highcharts.chart(
  "chart2_2",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 28,
      marginTop: 50,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 314,
          },
          chartOptions: {
            chart: {
              marginTop: 110,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -130,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2020, 0, 1),
      max: Date.UTC(2023, 11, 31),
      tickPositions: [
        Date.UTC(2020, 0, 1),
        Date.UTC(2021, 0, 1),
        Date.UTC(2022, 0, 1),
        Date.UTC(2023, 0, 1),
      ],
      labels: {
        format: "{value:%Y}",
        rotation: -45,
        align: "right",
      },
      plotBands: [
        {
          from: 48,
          to: 60,
          color: "rgba(68, 170, 213, 0.2)",
        },
      ],
      tickWidth: 0,
    },
    yAxis: {
      title: {
        text: "(연 %)",
        y: -158,
        x: 9,
      },
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y} %`;
      },
    },
    plotOptions: {
      series: {
        label: {
          turboThreshold: 5000,
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "기준금리",
        color: "#145FAA",
        data: chart2_2_1,
        showInLegend: false,
      },
    ],
    annotations: [
      {
        labelOptions: {
          backgroundColor: "rgba(255,255,255,0.5)",
          borderColor: "black",
          allowOverlap: true,
          align: "center",
        },
        labels: [
          {
            point: {
              x: Date.UTC(2020, 2, 17),
              y: 198,
              xAxis: 0,
              yAxis: 4,
            },
            text: "2020년 3월 17일",
          },
          {
            point: {
              x: Date.UTC(2020, 4, 28),
              y: 234,
              xAxis: 0,
              yAxis: 4,
            },
            text: "5월 28일",
          },
          {
            point: {
              x: Date.UTC(2021, 7, 26),
              y: 234,
              xAxis: 0,
              yAxis: 4,
            },
            text: "2021년 8월 26일",
          },
          {
            point: {
              x: Date.UTC(2021, 10, 25),
              y: 214,
              xAxis: 0,
              yAxis: 4,
            },
            text: "11월 25일",
            verticalAlign: "top",
            y: 28,
          },
          {
            point: {
              x: Date.UTC(2022, 0, 14),
              y: 198,
              xAxis: 0,
              yAxis: 4,
            },
            text: "2022년 1월 14일",
          },
          {
            point: {
              x: Date.UTC(2022, 3, 14),
              y: 179,
              xAxis: 0,
              yAxis: 4,
            },
            text: "4월 14일",
            verticalAlign: "top",
            y: 28,
          },
          {
            point: {
              x: Date.UTC(2022, 4, 26),
              y: 163,
              xAxis: 0,
              yAxis: 4,
            },
            text: "5월 26일",
          },
          {
            point: {
              x: Date.UTC(2022, 6, 13),
              y: 125,
              xAxis: 0,
              yAxis: 4,
            },
            text: "7월 13일",
            verticalAlign: "top",
            y: 46,
          },
          {
            point: {
              x: Date.UTC(2022, 7, 25),
              y: 110,
              xAxis: 0,
              yAxis: 4,
            },
            text: "8월 25일",
          },
          {
            point: {
              x: Date.UTC(2022, 9, 12),
              y: 72,
              xAxis: 0,
              yAxis: 4,
            },
            text: "10월 12일",
            verticalAlign: "top",
            y: 46,
          },
          {
            point: {
              x: Date.UTC(2022, 10, 24),
              y: 56,
              xAxis: 0,
              yAxis: 4,
            },
            text: "11월 24일",
          },
          {
            point: {
              x: Date.UTC(2023, 0, 13),
              y: 36,
              xAxis: 0,
              yAxis: 4,
            },
            text: "2023년 1월 13일",
            verticalAlign: "top",
            y: 28,
          },
        ],
      },
    ],
  })
);

/* 그림 Ⅱ- 3. 금융중개지원대출의 한도 및 금리 추이 */
const chart2_3_1 = getData(date2_3, data2_3_1, false);
const chart2_3_2 = getData(date2_3, data2_3_2, true);
Highcharts.chart(
  "chart2_3",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 32,
      marginTop: 78,
      marginRight: 28,
    },
    xAxis: {
      type: "datetime",
      min: Date.UTC(2014, 0, 1),
      max: Date.UTC(2023, 11, 31),
      tickInterval: Highcharts.timeUnits.YEAR,
      labels: {
        format: "{value:%Y}",
        rotation: -45,
        align: "right",
      },
      tickWidth: 0,
    },
    yAxis: [
      {
        title: {
          text: "(조 원)",
          rotation: 0,
          y: -147,
          x: 29,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(연%)",
          rotation: 0,
          y: -147,
          x: -28,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [0, 1, 2, 3],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: true,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
    ],
    tooltip: {
      formatter: function () {
        // 날짜 형식 변환
        const date = new Date(this.x);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const formattedDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          day.toString().padStart(2, "0");

        const suffix = this.series.options.tooltip.valueSuffix || "";
        return `<b>${formattedDate}</b><br/>${this.series.name} : ${this.y}${suffix}조 원`;
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
      line: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "한도(좌축)",
        color: "#145FAA",
        data: chart2_3_1,
        type: "line",
        yAxis: 0,
        tooltip: {
          valueSuffix: "조 원",
        },
      },
      {
        name: "금리(우축)",
        color: "#DC0C1E",
        data: chart2_3_2,
        type: "arearange",
        lineWidth: 2,
        fillOpacity: 0.3,
        yAxis: 1,
        tooltip: {
          valueSuffix: "연%",
        },
      },
    ],
  })
);

/* 그림 Ⅱ- 4. 공개시장운영 수단별 유동성 조절 규모 */
Highcharts.chart(
  "chart2_4",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 40,
      marginTop: 78,
    },
    xAxis: {
      categories: [
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      lineColor: "#D3D3D3", // xAxis의 라인 색상 변경
      lineWidth: 1, // xAxis의 라인 두께 변경
    },
    yAxis: {
      title: {
        text: "(조 원)",
        y: -152,
        x: 13,
      },
      tickInterval: 40,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
      tickPositions: [60, 100, 140, 180, 220],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "통화안정계정",
        data: [11.8, 16.4, 13.0, 8.7, 9.5, 9.3, 10.5, 9.1],
        color: "#009B82",
        dataLabels: {
          enabled: true,
          allowOverlap: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "#000000",
            textOutline: "none",
          },
        },
        tooltip: {
          valueSuffix: "조 원",
        },
      },
      {
        name: "RP(순)매각",
        data: [13.8, 14.4, 12.8, 10.5, 8.0, 17.5, 23.0, 11.3],
        color: "#D2915A",
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "#000000",
            textOutline: "none",
          },
        },
        tooltip: {
          valueSuffix: "조 원",
        },
      },
      {
        name: "통화안정증권",
        data: [176.7, 170.2, 171.5, 168.1, 163.1, 150.6, 127.1, 120.8],
        color: "#145FAA",
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "#ffffff",
            textOutline: "none",
          },
        },
        tooltip: {
          valueSuffix: "조 원",
        },
      },
    ],
  })
);

/* 그림 Ⅱ- 6. 금융불안지수(FSI) 및 금융취약성지수(FVI) */
Highcharts.chart(
  "chart2_6_1",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 33,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -146,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "07.01",
        "07.02",
        "07.03",
        "07.04",
        "07.05",
        "07.06",
        "07.07",
        "07.08",
        "07.09",
        "07.10",
        "07.11",
        "07.12",
        "08.01",
        "08.02",
        "08.03",
        "08.04",
        "08.05",
        "08.06",
        "08.07",
        "08.08",
        "08.09",
        "08.10",
        "08.11",
        "08.12",
        "09.01",
        "09.02",
        "09.03",
        "09.04",
        "09.05",
        "09.06",
        "09.07",
        "09.08",
        "09.09",
        "09.10",
        "09.11",
        "09.12",
        "10.01",
        "10.02",
        "10.03",
        "10.04",
        "10.05",
        "10.06",
        "10.07",
        "10.08",
        "10.09",
        "10.10",
        "10.11",
        "10.12",
        "11.01",
        "11.02",
        "11.03",
        "11.04",
        "11.05",
        "11.06",
        "11.07",
        "11.08",
        "11.09",
        "11.10",
        "11.11",
        "11.12",
        "12.01",
        "12.02",
        "12.03",
        "12.04",
        "12.05",
        "12.06",
        "12.07",
        "12.08",
        "12.09",
        "12.10",
        "12.11",
        "12.12",
        "13.01",
        "13.02",
        "13.03",
        "13.04",
        "13.05",
        "13.06",
        "13.07",
        "13.08",
        "13.09",
        "13.10",
        "13.11",
        "13.12",
        "14.01",
        "14.02",
        "14.03",
        "14.04",
        "14.05",
        "14.06",
        "14.07",
        "14.08",
        "14.09",
        "14.10",
        "14.11",
        "14.12",
        "15.01",
        "15.02",
        "15.03",
        "15.04",
        "15.05",
        "15.06",
        "15.07",
        "15.08",
        "15.09",
        "15.10",
        "15.11",
        "15.12",
        "16.01",
        "16.02",
        "16.03",
        "16.04",
        "16.05",
        "16.06",
        "16.07",
        "16.08",
        "16.09",
        "16.10",
        "16.11",
        "16.12",
        "17.01",
        "17.02",
        "17.03",
        "17.04",
        "17.05",
        "17.06",
        "17.07",
        "17.08",
        "17.09",
        "17.10",
        "17.11",
        "17.12",
        "18.01",
        "18.02",
        "18.03",
        "18.04",
        "18.05",
        "18.06",
        "18.07",
        "18.08",
        "18.09",
        "18.10",
        "18.11",
        "18.12",
        "19.01",
        "19.02",
        "19.03",
        "19.04",
        "19.05",
        "19.06",
        "19.07",
        "19.08",
        "19.09",
        "19.10",
        "19.11",
        "19.12",
        "20.01",
        "20.02",
        "20.03",
        "20.04",
        "20.05",
        "20.06",
        "20.07",
        "20.08",
        "20.09",
        "20.10",
        "20.11",
        "20.12",
        "21.01",
        "21.02",
        "21.03",
        "21.04",
        "21.05",
        "21.06",
        "21.07",
        "21.08",
        "21.09",
        "21.10",
        "21.11",
        "21.12",
        "22.01",
        "22.02",
        "22.03",
        "22.04",
        "22.05",
        "22.06",
        "22.07",
        "22.08",
        "22.09",
        "22.10",
        "22.11",
        "22.12",
        "23.01",
        "23.02",
        "23.03",
        "23.04",
        "23.05",
        "23.06",
        "23.07",
        "23.08",
        "23.09",
        "23.10",
        "23.11",
        "23.12",
      ],
      labels: {
        formatter: function () {
          const value = this.value;
          const parts = value.split(".");
          let yearPart = parseInt(parts[0], 10);
          const monthPart = parts[1];

          const formattedYear = yearPart < 10 ? "0" + yearPart : yearPart;

          if (
            monthPart === "01" ||
            (yearPart % 2 === 1 && monthPart === "07")
          ) {
            return "20" + formattedYear;
          } else {
            return "";
          }
        },
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "",
      },
      tickPositions: [0, 20, 40, 60, 80],
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
        {
          color: "#D2925B",
          width: 2,
          value: 24,
          dashStyle: "ShortDash",
          label: {
            text: "위험단계 (24)",
            align: "center",
            y: -5,
            x: 77,
            style: {
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#D2925B",
            },
          },
          zIndex: 5,
        },
        {
          color: "#009B82",
          width: 2,
          value: 12,
          dashStyle: "ShortDash",
          label: {
            text: "주의단계 (12)",
            align: "center",
            y: -5,
            x: 77,
            style: {
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#009B82",
            },
          },
          zIndex: 5,
        },
      ],
    },
    tooltip: {
      formatter: function () {
        var splitValue = this.x.split(".");
        var year = "20" + splitValue[0];
        var month =
          splitValue[1].length === 1 ? "0" + splitValue[1] : splitValue[1];

        return "<b>" + year + "년 " + month + "월</b><br/>" + this.y;
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "금융불안지수(FSI)",
        color: "#145FAA",
        data: [
          6.7, 6.4, 5.6, 4.7, 4.3, 4.6, 5.7, 7.4, 8.0, 8.1, 9.0, 10.5, 12.7,
          14.4, 16.7, 17.9, 19.6, 22.6, 26.0, 29.7, 38.2, 63.7, 77.0, 70.7,
          66.0, 60.1, 56.6, 49.5, 41.1, 34.0, 29.3, 24.3, 20.3, 17.5, 16.2,
          14.3, 13.0, 12.7, 10.9, 9.7, 13.1, 15.1, 13.2, 11.9, 11.0, 10.7, 10.7,
          10.6, 10.4, 11.0, 10.6, 9.2, 9.6, 10.3, 11.3, 14.8, 19.1, 20.2, 19.0,
          17.4, 16.1, 13.9, 12.3, 11.7, 12.6, 14.4, 16.1, 15.8, 15.0, 14.0,
          13.3, 12.4, 12.4, 13.0, 12.5, 12.5, 12.6, 12.9, 13.5, 12.5, 11.3, 9.8,
          9.3, 9.4, 9.5, 9.7, 9.1, 8.4, 8.1, 8.0, 8.3, 8.8, 9.4, 10.3, 11.2,
          11.5, 11.8, 11.7, 11.3, 10.6, 10.8, 12.3, 12.7, 13.4, 14.0, 13.5,
          13.1, 13.2, 14.0, 14.7, 13.6, 12.3, 11.9, 11.6, 11.3, 10.4, 9.9, 9.9,
          9.9, 9.5, 8.8, 8.1, 7.0, 5.9, 5.3, 4.9, 4.5, 4.5, 4.2, 3.9, 3.8, 3.8,
          4.5, 5.0, 5.5, 5.4, 5.0, 5.3, 6.4, 6.6, 6.8, 8.1, 8.8, 8.6, 8.4, 7.6,
          6.7, 6.6, 7.4, 7.7, 8.1, 8.8, 8.7, 8.2, 7.7, 7.7, 8.7, 12.6, 21.2,
          25.4, 21.6, 18.7, 15.1, 12.1, 11.7, 8.8, 7.2, 7.1, 6.3, 5.9, 4.2, 1.6,
          0.6, 0.0, 0.4, 0.9, 1.7, 1.7, 2.1, 2.8, 3.5, 5.4, 7.3, 8.2, 9.9, 12.7,
          15.3, 16.8, 19.6, 22.4, 24.1, 23.6, 22.9, 21.7, 20.5, 19.1, 17.6,
          17.0, 16.9, 17.1, 17.1, 18.0, 18.8, 18.2,
        ],
      },
    ],
  })
);
Highcharts.chart(
  "chart2_6_2",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 40,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -146,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "07.1",
        "07.2",
        "07.3",
        "07.4",
        "08.1",
        "08.2",
        "08.3",
        "08.4",
        "09.1",
        "09.2",
        "09.3",
        "09.4",
        "10.1",
        "10.2",
        "10.3",
        "10.4",
        "11.1",
        "11.2",
        "11.3",
        "11.4",
        "12.1",
        "12.2",
        "12.3",
        "12.4",
        "13.1",
        "13.2",
        "13.3",
        "13.4",
        "14.1",
        "14.2",
        "14.3",
        "14.4",
        "15.1",
        "15.2",
        "15.3",
        "15.4",
        "16.1",
        "16.2",
        "16.3",
        "16.4",
        "17.1",
        "17.2",
        "17.3",
        "17.4",
        "18.1",
        "18.2",
        "18.3",
        "18.4",
        "19.1",
        "19.2",
        "19.3",
        "19.4",
        "20.1",
        "20.2",
        "20.3",
        "20.4",
        "21.1",
        "21.2",
        "21.3",
        "21.4",
        "22.1",
        "22.2",
        "22.3",
        "22.4",
        "23.1",
        "23.2",
        "23.3",
        "23.4",
      ],
      tickPositioner: function () {
        return [0, 8, 16, 24, 32, 40, 48, 56, 64];
      },
      labels: {
        formatter: function () {
          var year = this.value;
          return "20" + year.toString().split(".")[0];
        },
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "",
      },
      tickPositions: [0, 20, 40, 60, 80, 100],
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    tooltip: {
      formatter: function () {
        var splitValue = this.x.split(".");
        var year = "20" + splitValue[0];
        var month =
          splitValue[1].length === 1 ? "0" + splitValue[1] : splitValue[1];

        return "<b>" + year + "년 " + month + "월</b><br/>" + this.y;
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: "금융취약성지수(FVI)",
        color: "#145FAA",
        data: [
          67.5, 73.3, 78.2, 79.0, 78.5, 80.6, 77.3, 66.5, 61.9, 59.7, 53.1,
          45.7, 37.7, 32.2, 26.2, 24.7, 23.2, 24.0, 20.7, 15.4, 15.9, 17.5,
          16.9, 16.6, 18.7, 21.5, 19.8, 19.5, 18.4, 18.1, 18.1, 18.5, 18.1,
          20.5, 20.1, 19.6, 18.7, 19.4, 22.5, 29.4, 31.1, 29.0, 28.2, 30.6,
          33.4, 32.4, 30.4, 30.4, 33.1, 34.2, 33.6, 36.6, 40.4, 40.2, 43.1,
          47.8, 55.4, 56.4, 56.6, 55.0, 55.5, 53.5, 52.2, 48.3, 45.16136839,
          41.17674639, 37.17613193, 33.97449608,
        ],
      },
    ],
  })
);

/* 그림 Ⅱ- 7. 가계신용 */
Highcharts.chart(
  "chart2_7_1",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 48,
      marginTop: 78,
      marginRight: 35,
    },
    xAxis: {
      categories: [
        "2007년 1분기",
        "2007년 2분기",
        "2007년 3분기",
        "2007년 4분기",
        "2008년 1분기",
        "2008년 2분기",
        "2008년 3분기",
        "2008년 4분기",
        "2009년 1분기",
        "2009년 2분기",
        "2009년 3분기",
        "2009년 4분기",
        "2010년 1분기",
        "2010년 2분기",
        "2010년 3분기",
        "2010년 4분기",
        "2011년 1분기",
        "2011년 2분기",
        "2011년 3분기",
        "2011년 4분기",
        "2012년 1분기",
        "2012년 2분기",
        "2012년 3분기",
        "2012년 4분기",
        "2013년 1분기",
        "2013년 2분기",
        "2013년 3분기",
        "2013년 4분기",
        "2014년 1분기",
        "2014년 2분기",
        "2014년 3분기",
        "2014년 4분기",
        "2015년 1분기",
        "2015년 2분기",
        "2015년 3분기",
        "2015년 4분기",
        "2016년 1분기",
        "2016년 2분기",
        "2016년 3분기",
        "2016년 4분기",
        "2017년 1분기",
        "2017년 2분기",
        "2017년 3분기",
        "2017년 4분기",
        "2018년 1분기",
        "2018년 2분기",
        "2018년 3분기",
        "2018년 4분기",
        "2019년 1분기",
        "2019년 2분기",
        "2019년 3분기",
        "2019년 4분기",
        "2020년 1분기",
        "2020년 2분기",
        "2020년 3분기",
        "2020년 4분기",
        "2021년 1분기",
        "2021년 2분기",
        "2021년 3분기",
        "2021년 4분기",
        "2022년 1분기",
        "2022년 2분기",
        "2022년 3분기",
        "2022년 4분기",
        "2023년 1분기",
        "2023년 2분기",
        "2023년 3분기",
        "2023년 4분기",
      ],
      labels: {
        formatter: function () {
          const year = this.value.substring(0, 4);
          if (
            ["2007", "2010", "2013", "2016", "2019", "2022", "2023"].includes(
              year
            ) &&
            this.value.endsWith("년 1분기")
          ) {
            return year;
          } else {
            return "";
          }
        },
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: [
      {
        title: {
          text: "(조원)",
          rotation: 0,
          y: -147,
          x: 29,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(%)",
          rotation: 0,
          y: -147,
          x: -21,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: true,
        gridLineDashStyle: "Dash",
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false, // 데이터 레이블 비활성화
        },
      },
    },
    series: [
      {
        name: "규모(좌축)",
        data: [
          612.4, 629.6, 642.0, 665.4, 677.2, 698.2, 713.3, 723.5, 720.4, 736.3,
          754.2, 776.0, 783.3, 800.1, 816.0, 843.2, 855.5, 877.2, 891.3, 916.2,
          916.5, 928.6, 940.7, 963.8, 962.9, 979.6, 993.6, 1019.0, 1022.4,
          1035.9, 1056.4, 1085.3, 1098.3, 1131.5, 1164.9, 1203.1, 1223.7,
          1257.6, 1296.5, 1342.5, 1359.0, 1387.8, 1419.1, 1450.6, 1468.1,
          1492.3, 1513.8, 1536.7, 1540.2, 1557.1, 1572.9, 1600.6, 1611.7,
          1638.0, 1683.1, 1729.5, 1766.7, 1810.6, 1845.5, 1862.9, 1862.9,
          1868.4, 1871.1, 1867.6, 1853.1, 1861.3, 1878.3, 1886.4,
        ],
        tooltip: {
          valueSuffix: "조 원",
        },
        color: "#23B4E1",
        yAxis: 0,
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn7">증가율(우축)<sup class="sup">2)</sup></a>',
        type: "line",
        yAxis: 0,
        data: [
          11.3, 10.6, 10.2, 9.6, 10.6, 10.9, 11.1, 8.7, 6.4, 5.5, 5.7, 7.3, 8.7,
          8.7, 8.2, 8.7, 9.2, 9.6, 9.2, 8.7, 7.1, 5.9, 5.6, 5.2, 5.1, 5.5, 5.6,
          5.7, 6.2, 5.7, 6.3, 6.5, 7.4, 9.2, 10.3, 10.9, 11.4, 11.1, 11.3, 11.6,
          11.1, 10.4, 9.5, 8.1, 8.0, 7.5, 6.7, 5.9, 4.9, 4.3, 3.9, 4.2, 4.6,
          5.2, 7.0, 8.1, 9.6, 10.5, 9.7, 7.7, 5.4, 3.2, 1.4, 0.2, -0.5, -0.4,
          0.4, 1.0,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#2E5296",
        yAxis: 1,
      },
    ],
  })
);
Highcharts.chart(
  "chart2_7_2",
  Highcharts.merge(chartOptions, {
    chart: {
      marginLeft: 38,
      marginTop: 78,
      marginRight: 35,
    },
    xAxis: {
      categories: [
        "2007년 1분기",
        "2007년 2분기",
        "2007년 3분기",
        "2007년 4분기",
        "2008년 1분기",
        "2008년 2분기",
        "2008년 3분기",
        "2008년 4분기",
        "2009년 1분기",
        "2009년 2분기",
        "2009년 3분기",
        "2009년 4분기",
        "2010년 1분기",
        "2010년 2분기",
        "2010년 3분기",
        "2010년 4분기",
        "2011년 1분기",
        "2011년 2분기",
        "2011년 3분기",
        "2011년 4분기",
        "2012년 1분기",
        "2012년 2분기",
        "2012년 3분기",
        "2012년 4분기",
        "2013년 1분기",
        "2013년 2분기",
        "2013년 3분기",
        "2013년 4분기",
        "2014년 1분기",
        "2014년 2분기",
        "2014년 3분기",
        "2014년 4분기",
        "2015년 1분기",
        "2015년 2분기",
        "2015년 3분기",
        "2015년 4분기",
        "2016년 1분기",
        "2016년 2분기",
        "2016년 3분기",
        "2016년 4분기",
        "2017년 1분기",
        "2017년 2분기",
        "2017년 3분기",
        "2017년 4분기",
        "2018년 1분기",
        "2018년 2분기",
        "2018년 3분기",
        "2018년 4분기",
        "2019년 1분기",
        "2019년 2분기",
        "2019년 3분기",
        "2019년 4분기",
        "2020년 1분기",
        "2020년 2분기",
        "2020년 3분기",
        "2020년 4분기",
        "2021년 1분기",
        "2021년 2분기",
        "2021년 3분기",
        "2021년 4분기",
        "2022년 1분기",
        "2022년 2분기",
        "2022년 3분기",
        "2022년 4분기",
        "2023년 1분기",
        "2023년 2분기",
        "2023년 3분기",
        "2023년 4분기",
      ],
      labels: {
        formatter: function () {
          const year = this.value.substring(0, 4);
          if (
            ["2007", "2010", "2013", "2016", "2019", "2022", "2023"].includes(
              year
            ) &&
            this.value.endsWith("년 1분기")
          ) {
            return year;
          } else {
            return "";
          }
        },
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: [
      {
        title: {
          text: "(%)",
          rotation: 0,
          y: -147,
          x: 29,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(%)",
          rotation: 0,
          y: -147,
          x: -21,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [40, 45, 50, 55, 60],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: true,
        gridLineDashStyle: "Dash",
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false, // 데이터 레이블 비활성화
        },
      },
    },
    series: [
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn8">처분가능소득 대비 가계부채비율(좌축)<sup class="sup">3)</sup></a>',
        data: [
          110.3, 111.7, 112.2, 114.2, 113.9, 115.2, 115.8, 116.7, 115.9, 117.7,
          119.3, 120.9, 119.9, 120.4, 121.3, 123.7, 123.6, 125.3, 125.7, 127.2,
          125.5, 125.5, 126.1, 128.5, 127.1, 127.9, 128.0, 129.5, 128.4, 128.8,
          130.1, 132.3, 131.5, 133.5, 134.9, 137.2, 139.0, 141.7, 145.3, 149.5,
          150.4, 152.9, 154.1, 156.2, 156.4, 157.0, 158.0, 158.8, 158.3, 158.6,
          159.0, 160.3, 159.7, 161.5, 164.5, 166.9, 169.9, 171.6, 173.5, 173.6,
          170.4, 168.3, 165.8, 163.5, 160.6, 160.4, 160.4, 159.2,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#2E5296",
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn9">금융자산 대비 금융부채 비율(우축)<sup class="sup">4)</sup></a>',
        data: [
          46.9, 45.7, 45.0, 46.1, 47.3, 48.0, 49.7, 50.7, 49.0, 47.4, 46.2,
          46.5, 46.2, 45.9, 45.5, 45.4, 45.2, 45.9, 47.6, 47.2, 46.4, 46.7,
          46.0, 45.9, 45.3, 45.6, 45.4, 45.5, 45.0, 44.7, 44.6, 44.7, 43.9,
          43.8, 44.4, 44.7, 44.6, 45.0, 45.4, 46.2, 46.1, 45.7, 46.2, 46.0,
          46.0, 46.5, 46.7, 47.9, 47.1, 47.1, 47.4, 47.2, 47.6, 46.4, 46.1,
          45.2, 45.3, 45.1, 45.7, 45.7, 45.7, 47.0, 47.2, 46.7, 45.3, 45.0,
          45.4, 45.4,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#D2915A",
        yAxis: 1,
      },
    ],
  })
);

/* 그림 Ⅱ- 8. 기업신용 및 재무건전성 */
Highcharts.chart(
  "chart2_8_1",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 30,
      marginTop: 90,
      marginRight: 40,
    },
    xAxis: {
      categories: [
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021.01",
        "2021.02",
        "2021.03",
        "2021.04",
        "2022.01",
        "2022.02",
        "2022.03",
        "2022.04",
        "2023.01",
        "2023.02",
        "2023.03",
        "2023.04",
      ],
      labels: {
        formatter: function () {
          var allowedLabels = [
            "2012",
            "2015",
            "2018",
            "2021.01",
            "2022.01",
            "2023.01",
          ];
          if (allowedLabels.indexOf(this.value) !== -1) {
            return this.value;
          }
          return "";
        },
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: [
      {
        title: {
          text: "(%)",
          rotation: 0,
          y: -135,
          x: 24,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [-5, 0, 5, 10, 15, 20],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(조원)",
          rotation: 0,
          y: -135,
          x: -28,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [-10, 0, 10, 20, 30, 40],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: true,
        gridLineDashStyle: "Dash",
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn11">기업대출 증가율(좌축)<sup class="sup">3)</sup></a>',
        type: "line",
        data: [
          4.4, 6.3, 9.5, 9.3, 6.0, 8.9, 8.6, 9.0, 15.3, 14.1, 11.6, 12.4, 13.4,
          14.7, 15.5, 15.1, 13.4, 10.3, 7.8, 6.3, 5.2,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#2E5296",
        yAxis: 0,
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn13">회사채 순발행(우축)<sup class="sup">5)</sup></a>',
        data: [
          17.2, 2.1, 0.5, -1.4, -5.7, -2.4, 6.3, 15.9, 11.4, 7.2, 4.5, 2.3,
          -1.3, 1.6, -3.4, -2.8, -3.8, 9.0, -3.4, -2.5, -2.6,
        ],
        tooltip: {
          valueSuffix: "조원",
        },
        color: "#23B4E1",
        yAxis: 1,
      },
    ],
  })
);
Highcharts.chart(
  "chart2_8_2",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 37,
      marginTop: 78,
      marginRight: 35,
    },
    xAxis: {
      categories: [
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      labels: {
        formatter: function () {
          var year = parseInt(this.value, 10);
          var baseYear = 2012;
          if ((year - baseYear) % 2 === 0) {
            return this.value;
          } else {
            return "";
          }
        },
      },
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: [
      {
        title: {
          text: "(%)",
          rotation: 0,
          y: -156,
          x: 24,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [20, 40, 60, 80, 100, 120],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: false,
        gridLineDashStyle: "Dash",
      },
      {
        title: {
          text: "(배)",
          rotation: 0,
          y: -156,
          x: -21,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        tickPositions: [0, 2, 4, 6, 8, 10],
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        opposite: true,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn12">부채비율(좌축)<sup class="sup">4)</sup></a>',
        data: [
          95.9, 93.4, 89.1, 84.5, 79.0, 74.8, 73.7, 78.3, 78.7, 81.4, 85.8,
          87.3,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#23B4E1",
        yAxis: 0,
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn14">이자보상배율(우축)<sup class="sup">6)</sup></a>',
        type: "line",
        data: [3.7, 3.9, 3.8, 5.1, 6.2, 8.9, 8.2, 3.9, 4.6, 8.7, 5.1, 1.6],
        tooltip: {
          valueSuffix: "배",
        },
        color: "#2E5296",
        yAxis: 1,
      },
    ],
  })
);

/* 그림 Ⅱ- 9. 일반은행 자산건전성 및 수익성 */
Highcharts.chart(
  "chart2_9",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 36,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            chart: {
              marginTop: 90,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -140,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "2014.1",
        "2014.2",
        "2014.3",
        "2014.4",
        "2015.1",
        "2015.2",
        "2015.3",
        "2015.4",
        "2016.1",
        "2016.2",
        "2016.3",
        "2016.4",
        "2017.1",
        "2017.2",
        "2017.3",
        "2017.4",
        "2018.1",
        "2018.2",
        "2018.3",
        "2018.4",
        "2019.1",
        "2019.2",
        "2019.3",
        "2019.4",
        "2020.1",
        "2020.2",
        "2020.3",
        "2020.4",
        "2021.1",
        "2021.2",
        "2021.3",
        "2021.4",
        "2022.1",
        "2022.2",
        "2022.3",
        "2022.4",
        "2023.1",
        "2023.2",
        "2023.3",
        "2023.4",
      ],
      lineColor: "#D3D3D3",
      lineWidth: 1,
      tickPositioner: function () {
        return [0, 8, 16, 24, 32];
      },
      labels: {
        formatter: function () {
          var year = this.value;
          return year.toString().split(".")[0];
        },
      },
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -154,
        x: 13,
      },
      tickPositions: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5],
      gridLineDashStyle: "Dash",
      labels: {
        format: "{value:.1f}",
      },
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn15">총자산순이익률(좌축)<sup class="sup">1)</sup></a>',
        data: [
          0.52, 0.51, 0.51, 0.42, 0.56, 0.53, 0.47, 0.36, 0.64, 0.56, 0.57,
          0.45, 0.77, 0.71, 0.66, 0.56, 0.74, 0.73, 0.72, 0.6, 0.62, 0.67, 0.68,
          0.58, 0.58, 0.52, 0.52, 0.47, 0.59, 0.62, 0.62, 0.49, 0.67, 0.62,
          0.62, 0.58, 0.71, 0.67, 0.68, 0.57,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#23B4E1",
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn16">순이자마진(좌축)<sup class="sup">2)</sup></a>',
        type: "line",
        yAxis: 0,
        data: [
          1.86, 1.86, 1.85, 1.83, 1.68, 1.65, 1.63, 1.62, 1.61, 1.6, 1.6, 1.6,
          1.64, 1.66, 1.67, 1.68, 1.71, 1.72, 1.71, 1.71, 1.68, 1.67, 1.65,
          1.62, 1.53, 1.5, 1.48, 1.47, 1.49, 1.5, 1.5, 1.52, 1.61, 1.65, 1.69,
          1.72, 1.77, 1.77, 1.75, 1.75,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#D2915A",
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn17">고정이하여신비율(우축)<sup class="sup">1)</sup></a>',
        type: "line",
        yAxis: 0,
        data: [
          1.69, 1.63, 1.59, 1.39, 1.36, 1.3, 1.17, 1.14, 1.12, 1.03, 0.95, 0.82,
          0.79, 0.74, 0.69, 0.71, 0.7, 0.61, 0.54, 0.56, 0.55, 0.52, 0.49, 0.45,
          0.46, 0.43, 0.4, 0.36, 0.36, 0.32, 0.29, 0.26, 0.25, 0.24, 0.23, 0.25,
          0.28, 0.29, 0.3, 0.31,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#145FAA",
      },
    ],
  })
);

/* 그림 Ⅱ- 10. 금융기관 자본비율 */
Highcharts.chart(
  "chart2_10",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 40,
      marginTop: 78,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -138,
              },
            },
          },
        },
      ],
    },
    xAxis: {
      categories: [
        "은행",
        "상호금융",
        "여신전문",
        "저축은행",
        "생명보험",
        "증권",
      ],
      lineColor: "#D3D3D3",
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -154,
        x: 13,
      },
      tickPositions: [0, 160, 320, 480, 640, 800],
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
        // {
        //   color: "#000000",
        //   width: 2,
        //   value: 12,
        //   dashStyle: "ShortDash",
        //   zIndex: 5,
        // },
      ],
    },
    plotOptions: {
      column: {
        borderRadius: "25%",
      },
    },
    series: [
      {
        name: "22.4/4",
        data: [551.2, 267.1, 570.4, 420.8, 206.4, 706.0],
        color: "#23B4E1",
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "23.1/4",
        data: [585.2, 251.0, 585.9, 435.8, 219.3, 719.6],
        color: "#FFB937",
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "23.2/4",
        data: [580.8, 258.1, 589.0, 452.7, 224.3, 730.5],
        color: "#82AAAA",
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "23.3/4",
        data: [574.5, 263.0, 589.3, 452.5, 224.5, 740.9],
        color: "#BEA078",
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "23.4/4",
        data: [null, 267.2, 598.6, 464.1, null, 736.4],
        color: "#C8C8C8",
        tooltip: {
          valueSuffix: "%",
        },
      },
    ],
  })
);

/* 그림 Ⅱ- 11. 명목GDP 대비 대외채무 비율 및 외환보유액 대비 단기외채 비율 */
Highcharts.chart(
  "chart2_11_1",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 48,
      marginTop: 78,
      marginRight: 35,
    },
    xAxis: {
      categories: [
        "07.1/4",
        "07.2/4",
        "07.3/4",
        "07.4/4",
        "08.1/4",
        "08.2/4",
        "08.3/4",
        "08.4/4",
        "09.1/4",
        "09.2/4",
        "09.3/4",
        "09.4/4",
        "10.1/4",
        "10.2/4",
        "10.3/4",
        "10.4/4",
        "11.1/4",
        "11.2/4",
        "11.3/4",
        "11.4/4",
        "12.1/4",
        "12.2/4",
        "12.3/4",
        "12.4/4",
        "13.1/4",
        "13.2/4",
        "13.3/4",
        "13.4/4",
        "14.1/4",
        "14.2/4",
        "14.3/4",
        "14.4/4",
        "15.1/4",
        "15.2/4",
        "15.3/4",
        "15.4/4",
        "16.1/4",
        "16.2/4",
        "16.3/4",
        "16.4/4",
        "17.1/4",
        "17.2/4",
        "17.3/4",
        "17.4/4",
        "18.1/4",
        "18.2/4",
        "18.3/4",
        "18.4/4",
        "19.1/4",
        "19.2/4",
        "19.3/4",
        "19.4/4",
        "20.1/4",
        "20.2/4",
        "20.3/4",
        "20.4/4",
        "21.1/4",
        "21.2/4",
        "21.3/4",
        "21.4/4",
        "22.1/4",
        "22.2/4",
        "22.3/4",
        "22.4/4",
        "23.1/4",
        "23.2/4",
        "23.3/4",
        "23.4/4",
      ],
      tickPositions: [0, 20, 40, 67],
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: [
      {
        title: {
          text: "(억 달러)",
          rotation: 0,
          y: -154,
          x: 37,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [0, 1500, 3000, 4500, 6000],
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(%)",
          rotation: 0,
          y: -154,
          x: -21,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [10, 20, 30, 40, 50],
        opposite: true,
        gridLineDashStyle: "Dash",
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false, // 데이터 레이블 비활성화
        },
      },
    },
    series: [
      {
        name: "순대외채권(좌축)",
        data: [
          1243.2, 1132.7, 1038.5, 777.7, 626.9, 503.4, 314.7, 276.7, 349.3,
          491.5, 550.2, 730.5, 697.5, 751.0, 896.4, 959.1, 910.2, 867.3, 1018.9,
          996.2, 1049.8, 956.9, 1124.8, 1289.1, 1349.1, 1382.7, 1623.5, 1850.4,
          1892.9, 2072.4, 2304.8, 2534.0, 2634.5, 2902.9, 3070.6, 3244.4,
          3467.6, 3661.5, 3887.5, 3992.5, 4080.0, 4254.2, 4471.4, 4653.8,
          4676.5, 4618.1, 4717.0, 4776.7, 4830.3, 4794.1, 4806.2, 4864.2,
          4643.2, 4470.5, 4609.9, 4838.0, 4670.8, 4552.2, 4625.5, 4518.5,
          4253.7, 3796.3, 3742.8, 3564.7, 3562.4, 3538.5, 3527.2, 3641.6,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#23B4E1",
        yAxis: 0,
      },
      {
        name: "대외채무/명목GDP(우축)",
        type: "line",
        yAxis: 0,
        data: [
          23.2, 24.7, 26.2, 28.7, 30.3, 31.0, 31.2, 29.8, 31.7, 34.6, 37.7,
          36.3, 34.5, 32.4, 32.7, 31.0, 32.7, 33.3, 31.7, 31.8, 32.1, 33.0,
          33.1, 31.9, 31.4, 31.1, 31.2, 30.8, 31.2, 31.5, 29.5, 28.5, 27.9,
          28.2, 27.8, 27.0, 26.9, 27.2, 27.0, 25.5, 26.4, 26.0, 25.7, 25.4,
          25.6, 25.5, 25.6, 25.6, 25.8, 27.5, 27.8, 28.5, 30.1, 31.6, 31.9,
          33.5, 33.5, 34.4, 34.0, 34.7, 36.1, 37.4, 37.1, 39.7, 40.0, 40.3,
          38.7, 38.7,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#2E5296",
        yAxis: 1,
      },
    ],
  })
);
Highcharts.chart(
  "chart2_11_2",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 48,
      marginTop: 78,
      marginRight: 42,
    },
    xAxis: {
      categories: [
        "07.1/4",
        "07.2/4",
        "07.3/4",
        "07.4/4",
        "08.1/4",
        "08.2/4",
        "08.3/4",
        "08.4/4",
        "09.1/4",
        "09.2/4",
        "09.3/4",
        "09.4/4",
        "10.1/4",
        "10.2/4",
        "10.3/4",
        "10.4/4",
        "11.1/4",
        "11.2/4",
        "11.3/4",
        "11.4/4",
        "12.1/4",
        "12.2/4",
        "12.3/4",
        "12.4/4",
        "13.1/4",
        "13.2/4",
        "13.3/4",
        "13.4/4",
        "14.1/4",
        "14.2/4",
        "14.3/4",
        "14.4/4",
        "15.1/4",
        "15.2/4",
        "15.3/4",
        "15.4/4",
        "16.1/4",
        "16.2/4",
        "16.3/4",
        "16.4/4",
        "17.1/4",
        "17.2/4",
        "17.3/4",
        "17.4/4",
        "18.1/4",
        "18.2/4",
        "18.3/4",
        "18.4/4",
        "19.1/4",
        "19.2/4",
        "19.3/4",
        "19.4/4",
        "20.1/4",
        "20.2/4",
        "20.3/4",
        "20.4/4",
        "21.1/4",
        "21.2/4",
        "21.3/4",
        "21.4/4",
        "22.1/4",
        "22.2/4",
        "22.3/4",
        "22.4/4",
        "23.1/4",
        "23.2/4",
        "23.3/4",
        "23.4/4",
      ],
      tickPositions: [0, 20, 40, 67],
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: [
      {
        title: {
          text: "(억 달러)",
          rotation: 0,
          y: -154,
          x: 37,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [0, 500, 1000, 1500, 2000, 2500],
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(%)",
          rotation: 0,
          y: -154,
          x: -22,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [0, 20, 40, 60, 80, 100],
        opposite: true,
        gridLineDashStyle: "Dash",
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false, // 데이터 레이블 비활성화
        },
      },
    },
    series: [
      {
        name: "단기외채 규모(좌축)",
        data: [
          1327.1, 1408.1, 1479.0, 1631.9, 1756.4, 1767.9, 1878.5, 1457.0,
          1409.6, 1412.8, 1418.2, 1458.7, 1512.8, 1479.2, 1460.6, 1349.5,
          1524.9, 1547.4, 1389.4, 1385.4, 1342.3, 1423.9, 1340.4, 1267.9,
          1222.0, 1191.1, 1117.1, 1098.9, 1222.9, 1313.9, 1255.2, 1146.6,
          1131.1, 1206.6, 1153.3, 1043.2, 1018.5, 1044.8, 1093.4, 1047.7,
          1144.9, 1168.6, 1191.4, 1159.6, 1203.5, 1248.6, 1263.1, 1256.0,
          1287.6, 1393.4, 1343.6, 1354.6, 1519.3, 1575.1, 1474.0, 1600.7,
          1651.8, 1776.9, 1644.5, 1651.3, 1752.3, 1852.6, 1713.5, 1664.8,
          1737.1, 1618.9, 1415.9, 1362.0,
        ],
        tooltip: {
          valueSuffix: "억 달러",
        },
        color: "#23B4E1",
        yAxis: 0,
      },
      {
        name: "단기외채/외환보유액(우축)",
        type: "line",
        yAxis: 0,
        data: [
          54.4, 56.2, 57.5, 62.2, 66.5, 68.5, 78.4, 72.4, 68.3, 61.0, 55.8,
          54.0, 55.6, 53.9, 50.4, 46.3, 51.1, 50.8, 45.8, 45.2, 42.5, 45.6,
          41.6, 38.8, 37.3, 36.5, 33.2, 31.7, 34.5, 35.8, 34.4, 31.5, 31.2,
          32.2, 31.3, 28.4, 27.5, 28.2, 28.9, 28.2, 30.5, 30.7, 31.0, 29.8,
          30.3, 31.2, 31.3, 31.1, 31.8, 34.6, 33.3, 33.1, 38.0, 38.3, 35.0,
          36.1, 37.0, 39.1, 35.4, 35.7, 38.3, 42.3, 41.1, 39.3, 40.8, 38.4,
          34.2, 32.4,
        ],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#2E5296",
        yAxis: 1,
      },
    ],
  })
);

/* 그림 Ⅱ- 14. 위조지폐 발견장수 */
Highcharts.chart(
  "chart2_14",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 40,
      marginTop: 78,
    },
    xAxis: {
      categories: ["2021", "2022", "2023"],
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(장)",
        y: -152,
        x: 13,
      },
      tickInterval: 50,
      min: 0,
      max: 250,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "오만원권",
        data: [22, 23, 18],
        tooltip: {
          valueSuffix: "장",
        },
        color: "#5B9BD5",
      },
      {
        name: "만원권",
        data: [39, 43, 37],
        tooltip: {
          valueSuffix: "장",
        },
        color: "#FF0000",
      },
      {
        name: "오천원권",
        data: [97, 75, 116],
        tooltip: {
          valueSuffix: "장",
        },
        color: "#FFD966",
      },
      {
        name: "천원권",
        data: [18, 9, 13],
        tooltip: {
          valueSuffix: "장",
        },
        color: "#70AD47",
      },
    ],
    annotations: [
      {
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 0,
              y: 176,
            },
            text: "176",
          },
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 1,
              y: 150,
            },
            text: "150",
          },
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 2,
              y: 184,
            },
            text: "184",
          },
        ],
        labelOptions: {
          backgroundColor: "rgba(255,255,255,0.5)",
          borderColor: "black",
          allowOverlap: true,
          align: "center",
        },
      },
    ],
  })
);

/* 그림 Ⅱ- 21. 한은금융망 결제금액 (일평균) */
Highcharts.chart(
  "chart2_21",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 40,
      marginTop: 100,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 452,
          },
          chartOptions: {
            chart: {
              marginTop: 120,
            },
            legend: {
              y: -15,
            },
            yAxis: {
              title: {
                y: -130,
              },
            },
          },
        },
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              y: -15,
            },
          },
        },
      ],
    },
    xAxis: {
      categories: ["2020", "2021", "2022", "2023"],
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(조 원)",
        y: -142,
        x: 12,
      },
      tickInterval: 100,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "외환결제금액",
        data: [14.8, 14.5, 16.8, 19.2],
        tooltip: {
          valueSuffix: "조 원",
        },
        color: "#FF5541",
      },
      {
        name: "콜결제금액",
        data: [21.6, 20.6, 23.1, 28.0],
        tooltip: {
          valueSuffix: "조 원",
        },
        color: "#009B82",
      },
      {
        name: '<a href="#" class="tooltip-btn" id="tooltip-chart-btn18">참가기관과 한국은행 간 자금이체<sup class="sup">1)</sup></a>',
        data: [18.5, 23.1, 27.1, 21.3],
        tooltip: {
          valueSuffix: "조 원",
        },
        color: "#23B4E1",
      },
      {
        name: "차액결제금액",
        data: [22.5, 25.9, 27.5, 27.0],
        tooltip: {
          valueSuffix: "조 원",
        },
        color: "#D2915A",
      },
      {
        name: "고객자금 및 기타",
        data: [110.1, 147.0, 160.0, 158.0],
        tooltip: {
          valueSuffix: "조 원",
        },
        color: "#FFB937",
      },
      {
        name: "증권결제금액",
        data: [236.1, 257.4, 269.9, 301.2],
        tooltip: {
          valueSuffix: "조 원",
        },
        color: "#145FAA",
      },
    ],
    annotations: [
      {
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 0,
              y: 423.6,
            },
            text: "423.6",
          },
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 1,
              y: 488.5,
            },
            text: "488.5",
          },
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 2,
              y: 524.3,
            },
            text: "524.3",
          },
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 3,
              y: 554.6,
            },
            text: "554.6",
          },
        ],
        labelOptions: {
          backgroundColor: "rgba(255,255,255,1)",
          borderColor: "black",
          allowOverlap: true,
          align: "top",
          y: 10,
        },
      },
    ],
  })
);

/* 그림 Ⅱ- 36. 대정부 일시대출 평균잔액 및 누계액 */
Highcharts.chart(
  "chart2_36",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 32,
      marginTop: 78,
      marginRight: 42,
    },
    xAxis: {
      categories: ["2019", "2020", "2021", "2022", "2023"],
      lineColor: "#D3D3D3",
    },
    yAxis: [
      {
        title: {
          text: "(조 원)",
          rotation: 0,
          y: -154,
          x: 32,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        opposite: false,
        gridLineWidth: 0,
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(조 원)",
          rotation: 0,
          y: -154,
          x: -31,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [0, 20, 40, 60, 80, 100, 120, 140],
        opposite: true,
        gridLineWidth: 0,
      },
    ],
    plotOptions: {
      column: {
        borderRadius: "25%",
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "평균잔액(좌축)",
        data: [2.9, 5.1, 0.2, 1.8, 4.4],
        color: "#145FAA",
        tooltip: {
          valueSuffix: "조 원",
        },
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
        yAxis: 0,
      },
      {
        name: "누계액(우축)",
        data: [36.5, 102.9, 7.6, 34.2, 117.6],
        color: "#D2915A",
        tooltip: {
          valueSuffix: "조 원",
        },
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
        yAxis: 1,
      },
    ],
  })
);

/* 그림 Ⅱ- 37. 재정증권 발행 및 상환 */
Highcharts.chart(
  "chart2_37",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 32,
      marginTop: 78,
    },
    xAxis: {
      categories: ["2019", "2020", "2021", "2022", "2023"],
      lineColor: "#D3D3D3",
    },
    yAxis: [
      {
        title: {
          text: "(조 원)",
          rotation: 0,
          y: -154,
          x: 31,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [0, 10, 20, 30, 40, 50, 60],
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
    ],
    plotOptions: {
      column: {
        borderRadius: "25%",
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "발행",
        data: [48.7, 45.3, 28.9, 16.3, 44.5],
        color: "#145FAA",
        tooltip: {
          valueSuffix: "조 원",
        },
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
      },
      {
        name: "상환",
        data: [48.7, 45.3, 28.9, 16.3, 44.5],
        color: "#D2915A",
        tooltip: {
          valueSuffix: "조 원",
        },
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
      },
    ],
  })
);

/* 그림 Ⅱ- 38. 한국은행 증권 커스터디 제공 규모 */
Highcharts.chart(
  "chart2_38",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 32,
      marginTop: 50,
    },
    xAxis: {
      categories: [
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      lineColor: "#D3D3D3",
    },
    yAxis: [
      {
        title: {
          text: "(조 원)",
          rotation: 0,
          y: -168,
          x: 30,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
    ],
    plotOptions: {
      series: {
        showInLegend: false,
      },
      column: {
        borderRadius: "25%",
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "발행",
        data: [4.6, 17.1, 23.8, 24.1, 26.0, 39.8, 41.4, 36.6],
        color: "#145FAA",
        tooltip: {
          valueSuffix: "조 원",
        },
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
      },
    ],
  })
);

/* 그림 Ⅲ- 11. 3급 이상 직원 및 승진자 중 여성 비중 */
Highcharts.chart(
  "chart3_11",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 32,
      marginTop: 78,
    },
    xAxis: {
      categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: {
      title: {
        text: "(%)",
        y: -152,
        x: 13,
      },
      tickInterval: 5,
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false, // 데이터 레이블 비활성화
        },
      },
    },
    series: [
      {
        name: "3급 이상 직원 중 여성 비중",
        data: [2.4, 3.4, 4.6, 6.4, 9.0, 11.8],
        tooltip: {
          valueSuffix: "%",
        },
        color: "#FFB937",
        dataLabels: {
          enabled: true, // 데이터 레이블 활성화
          format: "{y:.1f}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000", // 레이블의 색상 설정
            textOutline: "none", // 레이블의 테두리 없애기
          },
        },
      },
      {
        name: "3급 이상 승진자 중 여성 비중",
        type: "line",
        data: [4.5, 7.8, 11.6, 12.1, 20.0, 21.4],
        yAxis: 0,
        tooltip: {
          valueSuffix: "%",
        },
        color: "#D2915A",
        dataLabels: {
          enabled: true,
          format: "{y:.1f}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
          y: -7,
        },
      },
    ],
  })
);

/* 그림 Ⅲ- 12. 지방인재･지역전문 채용 규모 및 비중 */
Highcharts.chart(
  "chart3_12",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "column",
      marginLeft: 31,
      marginTop: 78,
      marginRight: 36,
    },
    xAxis: {
      categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
      lineColor: "#D3D3D3",
      lineWidth: 1,
    },
    yAxis: [
      {
        title: {
          text: "(명)",
          rotation: 0,
          y: -153,
          x: 23,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [0, 3, 6, 9, 12],
        opposite: false,
        gridLineDashStyle: "Dash",
        plotLines: [
          {
            color: "#000000",
            width: 1,
            value: 0,
            zIndex: 5,
          },
        ],
      },
      {
        title: {
          text: "(%)",
          rotation: 0,
          y: -153,
          x: -21,
          style: {
            color: "#000000",
            fontSize: "0.875rem",
          },
        },
        labels: {
          formatter: function () {
            return this.value.toLocaleString();
          },
        },
        tickPositions: [0, 5, 10, 15, 20],
        opposite: true,
        gridLineDashStyle: "Dash",
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "채용규모(좌축)",
        data: [6, 3, 5, 10, 5, 9],
        tooltip: {
          valueSuffix: "명",
        },
        color: "#23B4E1",
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
        yAxis: 0,
      },
      {
        name: "종합기획직원 중 채용비중(우축)",
        type: "line",
        data: [8.6, 5.1, 8.5, 18.2, 10.0, 14.3],
        yAxis: 0,
        tooltip: {
          valueSuffix: "%",
        },
        color: "#FF5541",
        dataLabels: {
          enabled: true,
          format: "{y:.1f}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
          y: -7,
        },
        yAxis: 1,
        marker: {
          fillColor: "white",
          lineWidth: 2,
          lineColor: null,
        },
      },
    ],
  })
);

/* 그림 Ⅲ- 13. 자산 현황(주요 항목) (기말 기준) */
Highcharts.chart(
  "chart3_13",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "bar",
      marginLeft: 69,
      marginTop: 78,
    },
    xAxis: {
      categories: [
        "유가증권",
        "어음대출",
        "예치금",
        '<a href="#" class="tooltip-btn" id="tooltip-chart-btn19">기타<sup class="sup">2)</sup></a>',
      ],
      lineColor: "#D3D3D3",
    },
    yAxis: {
      title: {
        text: "(조 원)",
        align: "high",
        y: -310,
        x: -36,
      },
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      column: {
        borderRadius: "25%",
      },
    },
    series: [
      {
        name: "2023",
        data: [400.5, 19.5, 35.7, 80.6],
        color: "#145FAA",
        tooltip: {
          valueSuffix: "조 원",
        },
        dataLabels: {
          enabled: true,
          format: "{y:.1f}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
      },
      {
        name: "2022",
        data: [393.4, 41.0, 52.9, 95.5],
        color: "#FF5541",
        tooltip: {
          valueSuffix: "조 원",
        },
        dataLabels: {
          enabled: true,
          format: "{y:.1f}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
      },
    ],
  })
);

/* 그림 Ⅲ- 14. 부채 및 자본 현황(주요 항목) (기말 기준) */
Highcharts.chart(
  "chart3_14",
  Highcharts.merge(chartOptions, {
    chart: {
      type: "bar",
      marginLeft: 130,
      marginTop: 78,
    },
    xAxis: {
      categories: [
        "화폐발행",
        "통화안정증권발행",
        "정부예금 및 예금",
        "환매조건부매각증권",
        "통화안정계정",
        "외환평가조정금",
        '<a href="#" class="tooltip-btn" id="tooltip-chart-btn20">기타<sup class="sup">2)</sup></a>',
        "자본",
      ],
      lineColor: "#D3D3D3",
    },
    yAxis: {
      title: {
        text: "(조 원)",
        align: "high",
        y: -310,
        x: -36,
      },
      gridLineDashStyle: "Dash",
      plotLines: [
        {
          color: "#000000",
          width: 1,
          value: 0,
          zIndex: 5,
        },
      ],
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      column: {
        borderRadius: "25%",
      },
    },
    series: [
      {
        name: "2023",
        data: [181.1, 121.6, 145.7, 0.5, 0.8, 30.5, 34.7, 21.5],
        color: "#145FAA",
        tooltip: {
          valueSuffix: "조 원",
        },
        dataLabels: {
          enabled: true,
          format: "{y:.1f}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
      },
      {
        name: "2022",
        data: [174.9, 112.4, 169.7, 20.0, 7.3, 23.0, 53.6, 21.9],
        color: "#FF5541",
        tooltip: {
          valueSuffix: "조 원",
        },
        dataLabels: {
          enabled: true,
          format: "{y:.1f}",
          style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#000000",
            textOutline: "none",
          },
        },
      },
    ],
  })
);
