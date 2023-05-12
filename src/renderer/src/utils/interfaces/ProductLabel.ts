export interface IProductLabel {
  id: number
  seriNo: string
  personelId: number
  isemriNo: string
  makId: number
  gramaj: number
  dara: number
  net: number
  adet: number
  stokKodu: string
  barkod: string
  stokAdi: string
  oncekiKod: string
  urunTip: string
  yapKod: string
  altStokKod: string | null
  altTarih: string | null
  altSaat: string | null
  ustStokKod: string | null
  ustTarih: string | null
  ustSaat: string | null
  renkAlt: string | null
  renkUst: string | null
  logoRenk: string | null
  logoDesc: string | null
  uretTip: number
  date: string
  grossWeight: number
  saat: string
  lotNo: string
  sealType: string
  sTarih: string
  sSaat: string
}
