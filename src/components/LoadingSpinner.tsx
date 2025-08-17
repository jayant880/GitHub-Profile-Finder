import { Loader2 } from "lucide-react"

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center py-8">
            <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
        </div>
    )
}

export default LoadingSpinner