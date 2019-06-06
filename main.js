let log = console.log.bind(console)

let n = 0
let current = 0
let timerId = undefined
let $slidelist = $('.slide-list')
let $slideDots = $('.slide-dots li')

function bindSlideEvent(){
  $('.slide').on('mouseenter', function(){
    $('.slide>.btn').addClass('active')
  })
  $('.slide').on('mouseleave', function(){
    $('.slide>.btn').removeClass('active')
  })
}

function bindDotsEvent(){
  $('.slide-dots li').each(function (i, ele) {
    $(ele).on('click', function () {
      goToSlide(i)
    })
  })
}

function bindBtnEvents() {
  let $btnprev = $('.btn.prev')
  let $btnnext = $('.btn.next')
  $btnprev.on('click', function () {
    goToSlide(n - 1)
  })
  $btnnext.on('click', function (event) {
    goToSlide(n + 1)
  })
}

function goToSlide(index) {

  if (index < 0) {
    index = $slideDots.length - 1
  } else if (index > $slideDots.length - 1) {
    index = 0
  }

  if (index === 0 && n === $slideDots.length - 1) {
    log('最后一个到第一个')

    $slidelist.css({
      'transform': `translateX(-${($slideDots.length + 1) * 680}px)`
    }).one('transitionend', function () {
      $slidelist.hide().offset()
      $slidelist.css({
        'transform': `translateX(-${(index + 1) * 680}px)`
      }).show()
    })

  } else if (index === $slideDots.length - 1 && n === 0) {
    log('从第一个到最后一个')

    $slidelist.css({
      'transform': `translateX(0px)`
    }).one('transitionend', function () {
      $slidelist.hide().offset()
      $slidelist.css({
        'transform': `translateX(-${(index + 1) * 680}px)`
      }).show()
    })

  } else {
    $slidelist.css({
      'transform': `translateX(-${ (index+1) * 680}px)`
    })
  }
  n = index
  activeDot(index)
}

function activeDot(index) {
  $('.slide-dots li').eq(index).addClass('active').siblings().removeClass('active')
}

function autoPlay() {
  return setInterval(() => {
    goToSlide(n + 1)
  }, 3000)
}

let init = function () {

  $('.slide-dots>li').eq(0).addClass('active')
  let $lastCopy = $('.slide-list>a').last().clone()
  let $firstCopy = $('.slide-list>a').first().clone()
  $slidelist.prepend($lastCopy)
  $slidelist.append($firstCopy)

  $slidelist.css({
    'transform': `translateX(-${(n + 1) * 680}px)`
  })

  // 切换页面后停止计时器
  document.addEventListener('visibilitychange', function(event){
    if(document.hidden){
      clearInterval(timerId)
    }else{
      timerId = autoPlay()
    }
  })

}
let __main = function () {
  init()
  bindBtnEvents()
  bindSlideEvent()
  bindDotsEvent()
  timerId = autoPlay()
}

__main()