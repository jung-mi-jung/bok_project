/* 연차보고서 */

// 목차
function snbSetting() {
  $(".snb-list ul").each(function () {
    $(this).parent("li").addClass("collapse");
  });
  if (!$("#annual-report-sidebar").hasClass("sidebar-floating")) {
    $(".snb-list li.on>ul, .allmenu-list li.on>ul").each(function () {
      $(this).show();
    });
  }
}
$(document).on("click", ".snb-list .collapse > a", function (e) {
  e.preventDefault();
  $(this).next("ul").slideToggle("fast").parent("li").toggleClass("on");
});

$(document).ready(function () {
  $(window).on("beforeunload", function () {
    $("body, html").scrollTop(0);
  });
  if ($("#annual-report-sidebar").length > 0) {
    snbSetting();

    $(document).on("click", ".snb-list > li > a", function (e) {
      var $clickedLi = $(this).closest("li");

      if ($clickedLi.hasClass("link-pdf")) {
        $clickedLi.siblings("li").find("ul").css("display", "none");
        $clickedLi
          .siblings()
          .removeClass("on")
          .children("a")
          .attr("aria-expanded", "false");
        $clickedLi.addClass("on").children("a").attr("aria-expanded", "true");
      } else {
        e.preventDefault();
        $clickedLi.siblings("li").find("ul").css("display", "none");
        $clickedLi.children("ul").css("display", "block");
        $clickedLi
          .siblings()
          .removeClass("on")
          .children("a")
          .attr("aria-expanded", "false");
        $clickedLi.children("a").attr("aria-expanded", "true");
        $clickedLi
          .siblings("li")
          .children("ul")
          .children("li")
          .children("ul")
          .children("li")
          .removeClass("on");
        $(".snb-list > li > ul > li.on").removeClass("on");
        $clickedLi.children("ul").children("li:first-child").addClass("on");
        $clickedLi
          .children("ul")
          .children("li:first-child")
          .children("ul")
          .css("display", "block");
      }
    });

    $(document).on("click", ".snb-list > li.on > a", function (e) {
      e.preventDefault();
      var $clickedLi = $(this).closest("li");

      if ($clickedLi.hasClass("on")) {
        $clickedLi
          .removeClass("on")
          .children("a")
          .attr("aria-expanded", "false");
      }
    });

    $(document).on("click", ".snb-list ul > li > a", function (e) {
      var $clickedLi = $(this).closest("li");

      if ($clickedLi.hasClass("link-pdf")) {
        $clickedLi
          .siblings()
          .removeClass("on")
          .children("a")
          .attr("aria-expanded", "false");
        $clickedLi.addClass("on").children("a").attr("aria-expanded", "true");
      } else {
        e.preventDefault();
        $clickedLi.siblings().find("ul").css("display", "none");
        $clickedLi.parents("ul").css("display", "block");
        $clickedLi
          .siblings()
          .removeClass("on")
          .children("a")
          .attr("aria-expanded", "false");
        $clickedLi.addClass("on").children("a").attr("aria-expanded", "true");
      }
    });

    $(document).on("click", ".snb-list ul > li.collapse.on > a", function (e) {
      e.preventDefault();
      var $clickedLi = $(this).closest("li");

      if ($clickedLi.hasClass("on")) {
        $clickedLi
          .removeClass("on")
          .children("a")
          .attr("aria-expanded", "false");
      }
    });

    $(document).on("click", ".snb-list ul ul > li > a", function (e) {
      e.preventDefault();
      var $clickedLi = $(this).closest("li");

      $clickedLi.siblings("li").children("ul").css("display", "none");
      $clickedLi.parents("ul").css("display", "block");
      $clickedLi
        .siblings()
        .removeClass("on")
        .children("a")
        .attr("aria-expanded", "false");
      $clickedLi.addClass("on").children("a").attr("aria-expanded", "true");
    });
  }
});

$(document).ready(function () {
  // 툴팁
  $(".tooltip-btn").attr("aria-expanded", "false");
  function adjustTooltipPosition(btn, tooltipCon) {
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
    tooltipCon.css({ top: conTop, left: conLeft, position: "absolute" });
  }

  $("[data-toggle-btn]").on("click", function (e) {
    e.preventDefault();

    var btn = $(this);
    var tooltipBtn = btn.data("toggle-btn");
    var tooltipCon = $("[data-toggle-content=" + tooltipBtn + "]").attr(
      "tabindex",
      "0"
    );

    if (btn.hasClass("active")) {
      return;
    } else {
      $("[data-toggle-btn]")
        .removeClass("active")
        .attr("aria-expanded", "false");

      btn.addClass("active").attr("aria-expanded", "true");
      tooltipCon.toggle(true);

      if (tooltipCon.hasClass("annual-report-tooltip")) {
        adjustTooltipPosition(btn, tooltipCon);
        $("body").append(tooltipCon);
        tooltipCon.attr("tabindex", "0").focus();
      }
    }
  });

  // 뷰포트 크기 변경을 감지, 활성화된 툴팁의 위치를 조정
  $(window).resize(function () {
    $("[data-toggle-btn].active").each(function () {
      var btn = $(this);
      var tooltipBtn = btn.data("toggle-btn");
      var tooltipCon = $("[data-toggle-content=" + tooltipBtn + "]");
      if (tooltipCon.length > 0) {
        adjustTooltipPosition(btn, tooltipCon);
      }
    });
  });

  $(".btn-close-tooltip").on("click", function () {
    var btnName = $(this)
      .closest("[data-toggle-content]")
      .data("toggle-content");
    var btn = $("[data-toggle-btn=" + btnName + "]");
    $(this).closest("[data-toggle-content]").toggle();
    $(".tooltip-btn").removeClass("active");
    btn.attr("aria-expanded", "false");
    btn.focus();
  });

  // 접근성 포커싱 유지
  $(document)
    .on("keydown", ".btn-close-tooltip", function (e) {
      if (e.keyCode == 9) {
        var $tooltip = $(this).closest(".annual-report-tooltip");
        var focusableElements = $tooltip
          .find(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
          )
          .filter(":visible");

        if (focusableElements.length === 1) {
          // 포커스 가능한 요소가 없을 경우
          e.preventDefault();
          if (!e.shiftKey) {
            $tooltip.attr("tabindex", "-1").focus();
          } else {
            setTimeout(function () {
              $tooltip.attr("tabindex", "-1").focus();
            }, 10);
          }
        } else {
          // 포커스 가능한 요소가 있을 경우, 기존 로직 유지
          if (!e.shiftKey) {
            e.preventDefault();
            focusableElements.first().focus();
          }
        }
      }
    })
    .on("keydown", ".annual-report-tooltip", function (e) {
      if (e.keyCode == 9) {
        var $tooltip = $(this);
        var focusableElements = $tooltip
          .find(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
          )
          .filter(":visible");
        var firstFocusableElement = focusableElements.first();
        var lastFocusableElement = focusableElements.last();

        if (e.shiftKey) {
          if (
            document.activeElement === firstFocusableElement[0] ||
            document.activeElement === $tooltip[0]
          ) {
            e.preventDefault();
            $(".btn-close-tooltip").focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement[0]) {
            e.preventDefault();
            $(".btn-close-tooltip").focus();
          }
        }
      }
    });

  // 목차 클릭 시 해당 타이틀로 이동
  $(".scroll-link").click(function (event) {
    event.preventDefault();

    var target = $(this.hash);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: target.offset().top - 14,
        },
        800,
        function () {
          target.attr("tabindex", "-1");
          target.focus();
        }
      );
  });

  // 목차 스크롤 시 상단 고정
  $(window).on("scroll resize", function () {
    var sidebar = $("#annual-report-sidebar");
    var annualReport = $(".annual-report-area");
    var scrollValue = $(window).scrollTop();

    if (scrollValue >= 1540) {
      sidebar.addClass("fixed");
      annualReport.addClass("responsive");
    } else {
      sidebar.removeClass("fixed");
      annualReport.removeClass("responsive");
    }
  });

  // 테블릿 이하 사이즈에서 목차 펼치기/접기
  $(".toggle-btn").on("click", function () {
    var sidebar = $("#annual-report-sidebar");

    if (sidebar.hasClass("hide")) {
      $(sidebar).removeClass("hide");
      $(this).removeClass("close");
      $(this).removeClass("close").find(".sr-only").text("목차 접기");
    } else {
      $(sidebar).addClass("hide");
      $(this).addClass("close");
      $(this).addClass("close").find(".sr-only").text("목차 펼치기");
    }
  });

  // table th 스타일 지정
  $("th[rowspan]").each(function () {
    var nextTh = $(this).next();
    if (nextTh.is("th")) {
      $(this).addClass("has-next-th");
    }
  });

  $(".tooltip-btn").on("click", function () {
    var btn = $(this);
    var tooltipBtn = btn.data("toggle-btn");
    var tooltipCon = $("[data-toggle-content=" + tooltipBtn + "]");

    $(".tooltip-btn").removeClass("active");
    btn.addClass("active");
    $(".annual-report-tooltip").hide();
    tooltipCon.show();
  });

  $(".scroll-container").on("scroll", function () {
    var scrollLeft = $(this).scrollLeft();

    if (scrollLeft > 0) {
      hideTooltip();
    }
  });

  function hideTooltip() {
    // 현재 스크롤된 테이블 내의 툴팁 숨김 처리
    var activeTooltipBtn = $(".scroll-container .tooltip-btn.active");
    var tooltipName = activeTooltipBtn.data("toggle-btn");
    $(
      ".annual-report-tooltip[data-toggle-content='" + tooltipName + "']"
    ).hide();
    activeTooltipBtn.removeClass("active");
  }

  // 2023년도 연차보고서 기자설명회 자막 펼침/닫힘
  $(".script-btn").click(function () {
    var $btnImg = $(this).find("img");
    var $btnSpan = $(this).find("span");

    if ($btnSpan.text() === "닫기") {
      $btnImg.attr("src", "static/portal/img/template/ico_script@2x.png");
      $btnSpan.text("자막보기");
      $(".script-area").slideUp();
    } else {
      $btnImg.attr("src", "static/portal/img/template/ico_bubble_close@2x.png");
      $btnSpan.text("닫기");
      $(".script-area").slideDown();
    }
  });
});
