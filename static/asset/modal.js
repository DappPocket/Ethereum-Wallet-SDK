const modal =  `
    <!-- Modal -->
    <div id="dappQrcodeModal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="width: 400px;">
                <div class="modal-header">
                <image width="30%" src="https://cdn-images-1.medium.com/max/2600/1*CFkr9L62JsweS2Ad6DV0FA.png">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        <h6 class="h6">Choose your favorite wallet!</h6>
                    </div>
                    <image class="mx-auto d-block mt-3" width="30%" id="use-metamask-btn" src="https://en.bitcoinwiki.org/upload/en/images/thumb/e/eb/Metamask.png/400px-Metamask.png">
                    <br>
                    <image class="mx-auto d-block" id="use-dapper-btn" width="30%" src="https://www.meetdapper.com/logos/logo_dapper.svg">
                    <br>
                    <image class="mx-auto d-block mt-3" id="use-torus-btn" width="30%" src="https://tor.us/assets/img/torus-logo.svg">
                    <br>
                    <image class="mx-auto d-block mt-3" id="use-portis-btn" width="30%" src="https://assets.portis.io/portis-logo/logo_with_name_medium.png">
                    <br>
                    <image class="mx-auto d-block mt-3" width="30%" src="https://cdn.worldvectorlogo.com/logos/ledger.svg">
                    <br>
                    <image class="mx-auto d-block mt-3" id="use-wc-btn" width="30%" src="https://discuss.walletconnect.org/uploads/default/original/1X/4626bb8c421ab0f5f869eb7a55852e9eba7442e4.png">
                    <br>    
                </div>
                <div class="modal-footer">
                    <text class="font-weight-light">Powered by Dapp SDK</text>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
`;

module.exports = modal;