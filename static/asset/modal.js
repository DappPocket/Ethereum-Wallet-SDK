const modal = `
    <head>
        <style>
            .sk-folding-cube {
                margin: 5vh auto;
                width: 40px;
                height: 40px;
                position: relative;
                -webkit-transform: rotateZ(45deg);
                        transform: rotateZ(45deg);
            }

            .sk-folding-cube .sk-cube {
                float: left;
                width: 50%;
                height: 50%;
                position: relative;
                -webkit-transform: scale(1.1);
                    -ms-transform: scale(1.1);
                        transform: scale(1.1); 
            }

            .sk-folding-cube .sk-cube:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #0A3D50;
                -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
                        animation: sk-foldCubeAngle 2.4s infinite linear both;
                -webkit-transform-origin: 100% 100%;
                    -ms-transform-origin: 100% 100%;
                        transform-origin: 100% 100%;
            }
            .sk-folding-cube .sk-cube2 {
            -webkit-transform: scale(1.1) rotateZ(90deg);
                    transform: scale(1.1) rotateZ(90deg);
            }
            .sk-folding-cube .sk-cube3 {
            -webkit-transform: scale(1.1) rotateZ(180deg);
                    transform: scale(1.1) rotateZ(180deg);
            }
            .sk-folding-cube .sk-cube4 {
            -webkit-transform: scale(1.1) rotateZ(270deg);
                    transform: scale(1.1) rotateZ(270deg);
            }
            .sk-folding-cube .sk-cube2:before {
            -webkit-animation-delay: 0.3s;
                    animation-delay: 0.3s;
            }
            .sk-folding-cube .sk-cube3:before {
            -webkit-animation-delay: 0.6s;
                    animation-delay: 0.6s; 
            }
            .sk-folding-cube .sk-cube4:before {
            -webkit-animation-delay: 0.9s;
                    animation-delay: 0.9s;
            }
            @-webkit-keyframes sk-foldCubeAngle {
                0%, 10% {
                    -webkit-transform: perspective(140px) rotateX(-180deg);
                            transform: perspective(140px) rotateX(-180deg);
                    opacity: 0; 
                } 25%, 75% {
                    -webkit-transform: perspective(140px) rotateX(0deg);
                            transform: perspective(140px) rotateX(0deg);
                    opacity: 1; 
                } 90%, 100% {
                    -webkit-transform: perspective(140px) rotateY(180deg);
                            transform: perspective(140px) rotateY(180deg);
                    opacity: 0; 
                } 
            }

            @keyframes sk-foldCubeAngle {
                0%, 10% {
                    -webkit-transform: perspective(140px) rotateX(-180deg);
                            transform: perspective(140px) rotateX(-180deg);
                    opacity: 0; 
                } 25%, 75% {
                    -webkit-transform: perspective(140px) rotateX(0deg);
                            transform: perspective(140px) rotateX(0deg);
                    opacity: 1; 
                } 90%, 100% {
                    -webkit-transform: perspective(140px) rotateY(180deg);
                            transform: perspective(140px) rotateY(180deg);
                    opacity: 0; 
                }
            }

            .wallet-button-img {
                width: 40%;
            }
        </style>
    </head>
    <!-- Modal -->
    <div class="bootstrap-iso">
        <div id="dappQrcodeModal" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header align-items-center">
                        <img id="dapp-icon" class="mr-3" style="max-width: 20px;" src="https://images.cointelegraph.com/images/240_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy8wZWNiY2NiNDI0NWQ2MThmMGI0MzUxNGQ0Y2QxZTg1NS5wbmc=.png">
                        <h4 id="dapp-title" class="h4 mb-0">Sign in</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="walletGroup">
                            <div class="text-center">
                                <h6 class="h6 mb-3 font-weight-light" id="modal-intro"></h6>
                            </div>
                            <button id="use-metamask-btn" class="btn btn-light btn-block">
                                <img class="my-2 wallet-button-img" src="https://i.imgur.com/2HV78Pn.png">
                            </button>
                            <button id="use-dapper-btn" class="btn btn-light btn-block">
                                <img class="my-2 wallet-button-img" src="https://i.imgur.com/GEM6grZ.png">
                            </button>
                            <button id="use-torus-btn" class="btn btn-light btn-block">
                                <img class="my-2 wallet-button-img" src="https://i.imgur.com/1EL9dlf.png">
                            </button>
                            <button id="use-portis-btn" class="btn btn-light btn-block">
                                <img class="my-2 wallet-button-img" src="https://i.imgur.com/3oXNS7K.png">
                            </button>
                            <button id="use-ledger-btn" class="btn btn-light btn-block">
                                <img class="my-2 wallet-button-img" src="https://i.imgur.com/vlxG8lN.png">
                            </button>
                            <button id="use-wc-btn" class="btn btn-light btn-block">
                                <h4 class="my-2 text-primary">Connect Mobile Wallet</h4>
                            </button>
                        </div>
                        <div id="ledger-path" style="display: none;">
                            <button id="go-back" class="btn btn-light btn-block">
                                <h6 class="my-2 text-primary">← Back</h6>
                            </button>
                            <button id="use-legacy-path" class="btn btn-light btn-block">
                                <h6 class="my-2 text-primary">MEW / MyCrypto - m/44'/60'/0'/0</h6>
                            </button>
                            <button id="use-ledger-live-path" class="btn btn-light btn-block">
                                <h6 class="my-2 text-primary">Ledger Live - m/44'/60'/0'/0/0</h6>
                            </button>
                        </div>
                        <div id="spinner" style="display: none;">
                            <div class="text-center">
                                <h6 class="h6">Connecting...</h6>
                            </div>
                            <div class="sk-folding-cube">
                                <div class="sk-cube1 sk-cube"></div>
                                <div class="sk-cube2 sk-cube"></div>
                                <div class="sk-cube4 sk-cube"></div>
                                <div class="sk-cube3 sk-cube"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="help-button" class="btn btn-link mr-auto p-0 text-primary font-weight-light">Help</button>
                        <div>
                            <text class="font-weight-light text-secondary">Powered by</text>
                            <a class="font-weight-light" href="https://dappsdk.io/" target="_blank">Dapp SDK</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

module.exports = modal;
