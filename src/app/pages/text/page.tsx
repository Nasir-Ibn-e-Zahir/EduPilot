import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



interface Props{
    text: string | undefined
}

export default function Random({text}:Props) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                <h1 className="text-4xl" > Extracted Text </h1>
            </CardTitle>
            <CardContent className="text-2xl">
                {text}
            </CardContent>
        </CardHeader>
    </Card>
  )
}
