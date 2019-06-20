const modal =  `
    <!-- Modal -->
    <div id="dappQrcodeModal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="width: 400px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Choose your favorite wallet!</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <image id="use-metamask-btn" width="40%" src="https://en.bitcoinwiki.org/upload/en/images/thumb/e/eb/Metamask.png/400px-Metamask.png">
                    <br>
                    <image id="use-dapper-btn" width="40%" src="https://www.meetdapper.com/logos/logo_dapper.svg">
                    <br>
                    <image id="use-torus-btn" width="40%" class="mt-3" src="https://tor.us/assets/img/torus-logo.svg">
                    <br>
                    <image id="use-portis-btn" width="40%" class="mt-3" src="https://assets.portis.io/portis-logo/logo_with_name_medium.png">
                    <br>
                    <image width="40%" class="mt-3" src="https://cdn.worldvectorlogo.com/logos/ledger.svg">
                    <br>
                    <image id="use-wc-btn" width="40%" class="mt-3" src="https://discuss.walletconnect.org/uploads/default/original/1X/4626bb8c421ab0f5f869eb7a55852e9eba7442e4.png">
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
`;