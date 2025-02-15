import {
  handleFadeShow,
  handleFadeVisible,
  handleFadeHide
} from '@/helpers/actions/plugins/semantic/popup'

export default function (
  {
    html
  }
) {
  const className = 'ui popup main-popup'

  return {
    position: 'right center',
    transition: 'fade right',
    variation: 'basic',
    exclusive: true,
    hoverable: true,
    preserve: true,
    className: {
      popup: className
    },
    delay: {
      show: 0,
      hide: 150
    },
    html,
    onShow () {
      handleFadeShow(
        this,
        'right'
      )
    },
    onVisible () {
      handleFadeVisible(
        this,
        'right'
      )
    },
    onHide () {
      handleFadeHide(
        this,
        'right'
      )
    }
  }
}
