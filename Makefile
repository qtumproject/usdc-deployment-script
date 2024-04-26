forge-install:
	rm -rfv lib \
	&& forge install --no-git OpenZeppelin/openzeppelin-contracts@v3.1.0 \
	&& forge install --no-git circlefin/stablecoin-evm@v2.2.0 \
