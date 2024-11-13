import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { AssetGlobalVariation, KeyVariation } from "@/@types/investment"
import { useInvestmentAssets } from "@/providers/InvestmentAssetsProvider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function InputSettings({
    desc, 
    variationType,
    variationTypeKey,
    callback }: { 
        desc: string; 
        variationType: AssetGlobalVariation;
        variationTypeKey: KeyVariation;
        callback: (variationAssetValue: number, profileAssetKey: keyof AssetGlobalVariation, variationAssetKey: KeyVariation) => void 
    }) {
    return (
        <div>
            <Label>{desc}</Label>
            <Input value={variationType["low-risk"]} onChange={(e) => callback(Number(e.target.value), "low-risk", variationTypeKey)} />
            <Input value={variationType["medium-risk"]} onChange={(e) => callback(Number(e.target.value), "medium-risk", variationTypeKey)} />
            <Input value={variationType["high-risk"]} onChange={(e) => callback(Number(e.target.value), "high-risk", variationTypeKey)} />
        </div>
    )
}

export function AssetsVariationSettings() {
    const investmentAssetsContext = useInvestmentAssets()

    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline"><Settings /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Dev Settings for market prices variation</AlertDialogTitle>
            <AlertDialogDescription>
                <InputSettings 
                    desc='Drift' 
                    variationType={investmentAssetsContext.variationSettings.drift} 
                    variationTypeKey={'drift'}
                    callback={investmentAssetsContext.variationSettings.setVariationAsset}
                />
                <InputSettings 
                    desc='Volatility'
                    variationType={investmentAssetsContext.variationSettings.volatility} 
                    variationTypeKey={'volatility'}
                    callback={investmentAssetsContext.variationSettings.setVariationAsset}
                />
                <InputSettings 
                    desc='Chance of loss'
                    variationType={investmentAssetsContext.variationSettings.loss} 
                    variationTypeKey={'loss'}
                    callback={investmentAssetsContext.variationSettings.setVariationAsset}
                />
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}