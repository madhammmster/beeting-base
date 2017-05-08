<template>

<div class="right-content column four wide">
        <div class="row container-informations">
          <div class="container-credits">
            <div class="credits-text">
              CREDITS:
            </div>
            <div class="credits-value">
              1000
            </div>
          </div>
        </div>
        <div class="row container-messenger">
          <div class="messenger-header">
            <div class="messenger-header-icon"></div>
            <div class="messenger-header-text">
              <div class="messenger-header-title">
                MESSENGER
              </div>
              <div class="container-current-room">
                <div class="current-room-text">
                  CURRENT ROOM:
                </div>
                <div class="current-room-select">
                  <div class="ui selection dropdown">
                    <input type="hidden" name="room">
                    <i class="dropdown icon"></i>
                    <div class="default text">Global</div>
                    <div class="menu">
                      <div class="item" data-value="1">Global</div>
                      <div class="item" data-value="0">Motorsport</div>
                    </div>
                  </div>
                </div>
                <div class="clear"></div>
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="messenger-main-window">
            <div class="messenger-messages">

              <div class="ui list">
                <div class="item">
                  <i class="users icon"></i>
                  <div class="content">
                    <span class="bolder">User-1:</span> hello
                  </div>
                </div>

                <div class="item">
                  <i class="users icon"></i>
                  <div class="content">
                    <span class="bolder">User-2:</span> hello
                  </div>
                </div>

                <div class="item">
                  <i class="users icon yellow"></i>
                  <div class="content" style="color: #FFD700;">
                    <span class="bolder">Admin:</span> Have fun
                  </div>
                </div>

              </div>

            </div>
            <div class="messenger-send-input">
              <div class="ui icon fluid input">
                <input type="text" placeholder="Send...">
                <i class="circular send link icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

</template>

<script>

export default {
  name: 'right-panel-component'
}

</script>