import {
  BaseWindow,
  WebContentsView
} from 'electron'
import {
  windowIcon
} from '../../helpers/icons.js'
import {
  baseUrl
} from '../../helpers/urls.js'
import changeViewBackgroundColor
  from '../view/changeBackgroundColor.js'
import setViewScale from '../view/setScale.js'
import setAboutViewBounds from '../aboutView/setBounds.js'
// import showViewDevTools from '../view/showDevTools.js'
import {
  isDevelopment
} from '../../helpers/utils.js'
import {
  preloadScriptFilePath
} from '../../helpers/paths.js'

function handleClose (
  event
) {
  event.preventDefault()

  aboutWindow.hide()
}

export default function () {
  const aboutWindowWidth = 500
  const aboutWindowHeight = 275

  const aboutWindowOptions = {
    width: aboutWindowWidth,
    height: aboutWindowHeight,
    minWidth: aboutWindowWidth,
    minHeight: aboutWindowHeight,
    icon: windowIcon,
    show: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false
  }

  aboutWindow =
    new BaseWindow(
      aboutWindowOptions
    )

  aboutWindow.removeMenu()

  const aboutViewOptions = {
    webPreferences: {
      devTools: isDevelopment,
      preload: preloadScriptFilePath,
      nodeIntegration: true
    }
  }

  aboutView =
    new WebContentsView(
      aboutViewOptions
    )

  setAboutViewBounds()

  // showViewDevTools(
  //   aboutView
  // )

  setViewScale(
    aboutView
  )

  changeViewBackgroundColor(
    aboutView
  )

  aboutWindow
    .contentView
    .addChildView(
      aboutView
    )

  const url = `${baseUrl}#/about`

  aboutView
    .webContents
    .loadURL(
      url
    )

  aboutWindow.on(
    'close',
    handleClose
  )
}
