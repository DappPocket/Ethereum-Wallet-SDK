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
                    <button id="use-metamask-btn" class="btn btn-light">
                        <image width="30%" src="https://en.bitcoinwiki.org/upload/en/images/thumb/e/eb/Metamask.png/400px-Metamask.png">
                    </button>
                    <br>
                    <button id="use-dapper-btn" class="btn btn-light btn-block">
                        <image class="my-2" width="30%" src="https://www.meetdapper.com/logos/logo_dapper.svg">
                    </button>
                    <button id="use-torus-btn" class="btn btn-light btn-block">
                        <image class="my-2" width="30%" src="https://tor.us/assets/img/torus-logo.svg">
                    </button>
                    <button id="use-portis-btn" class="btn btn-light">
                        <image class="my-2" width="30%" src="https://assets.portis.io/portis-logo/logo_with_name_medium.png">
                    </button>
                    <br>
                    <button id="use-ledger-btn" class="btn btn-light">
                        <image class="my-2" width="30%" src="https://cdn.worldvectorlogo.com/logos/ledger.svg">
                    </button>
                    <br>
                    <button id="use-wc-btn" class="btn btn-light">
                        <image class="my-2" width="30%" src="https://discuss.walletconnect.org/uploads/default/original/1X/4626bb8c421ab0f5f869eb7a55852e9eba7442e4.png">
                    </button>
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