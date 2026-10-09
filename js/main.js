(function ($) {
  'use strict';

  const emailUser = 'eunyeong0110';
  const emailDomain = 'naver.com';
  const emailAddress = emailUser + '@' + emailDomain;

  let toastTimer = null;

  function showToast(success) {
    const $toast = $('#copyToast');

    if (!$toast.length) {
      return;
    }

    if (success) {
      $toast.find('.copy-toast__kr').text('이메일 주소가 복사되었습니다.');
      $toast.find('.copy-toast__jp').text('メールアドレスをコピーしました。');
    } else {
      $toast.find('.copy-toast__kr').text('복사하지 못했습니다. 다시 시도해주세요.');
      $toast.find('.copy-toast__jp').text('コピーできませんでした。もう一度お試しください。');
    }

    window.clearTimeout(toastTimer);

    $toast.removeClass('is-visible');

    // Restart the small entrance transition even on repeated clicks.
    void $toast[0].offsetWidth;

    $toast.addClass('is-visible');

    toastTimer = window.setTimeout(function () {
      $toast.removeClass('is-visible');
    }, 1900);
  }

  function fallbackCopy(text) {
    const $textarea = $('<textarea>')
      .val(text)
      .attr('readonly', '')
      .css({
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        opacity: 0
      })
      .appendTo('body');

    $textarea[0].select();
    $textarea[0].setSelectionRange(0, text.length);

    let copied = false;

    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }

    $textarea.remove();

    return copied;
  }

  $('.js-copy-email').on('click', function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(emailAddress)
        .then(function () {
          showToast(true);
        })
        .catch(function () {
          showToast(fallbackCopy(emailAddress));
        });

      return;
    }

    showToast(fallbackCopy(emailAddress));
  });
})(jQuery);
