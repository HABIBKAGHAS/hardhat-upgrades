const { ethers } = require("hardhat");

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin");
    const transparentProxy = await ethers.getContract("Box_Proxy");
    const boxV1 = await ethers.getContract("Box", transparentProxy.address);
    const versionV1 = await boxV1.version();

    const boxV2 = await ethers.getContract("BoxV2");
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address);
    await upgradeTx.wait(1);

    const proxyBox = await ethers.getContractAt("BoxV2", transparentProxy.address);
    const versionV2 = await proxyBox.version();
    console.log({ versionV1, versionV2 });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
