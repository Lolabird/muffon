<template>
  <div
    id="the-quit-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import profileStore from '@/stores/profile'

export default {
  name: 'TheQuitObserver',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isCloseTabsOnQuit',
        'isShowDonateModalLater'
      ]
    ),
    ...mapState(
      profileStore,
      {
        isRememberProfile: 'isRemember'
      }
    )
  },
  mounted () {
    window
      .mainProcess
      .addCommandHandler(
        'quit-called',
        this.handleQuitCalled
      )
  },
  methods: {
    async handleQuitCalled () {
      if (!this.isRememberProfile) {
        await this.clearProfileData()
      }

      if (this.isCloseTabsOnQuit) {
        await this.clearTabs()
      }

      if (this.isShowDonateModalLater) {
        await this.resetDonateModalData()
      }

      this.quit()
    },
    clearProfileData () {
      return this.setElectronStoreData(
        {
          'profile.info': null,
          'profile.token': null
        }
      )
    },
    setElectronStoreData (
      value
    ) {
      const dataFormatted =
        JSON.stringify(
          value
        )

      return window
        .mainProcess
        .sendAsyncCommand(
          'set-electron-store-data',
          dataFormatted
        )
    },
    clearTabs () {
      return this.setElectronStoreData(
        {
          'layout.tabs': []
        }
      )
    },
    resetDonateModalData () {
      return this.setElectronStoreData(
        {
          'layout.isShowDonateModal': true
        }
      )
    },
    quit () {
      window
        .mainProcess
        .sendCommand(
          'quit'
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
