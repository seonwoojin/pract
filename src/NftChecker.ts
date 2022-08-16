import { AllNft } from "./AllNft";

export function NftChecker(chain: string | undefined, nft: string | undefined) {
  let check = false;
  if (!Object.keys(AllNft).includes(chain!)) {
    check = false;
    return check;
  }
  const datas = Object.entries(AllNft);
  for (let i = 0; i < datas.length; i++) {
    Object.entries(datas[i][1]).map((data) => {
      if (data[0].toLowerCase() === nft) {
        check = true;
      }
    });
  }
  return check;
}
