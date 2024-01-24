"use client"
import { trpc } from "../_trpc/client"

export default function TestHook() {
    const test = trpc.test.useQuery()
    const testMutation = trpc.hello.useMutation()

    return (
        <div>
            <p>{JSON.stringify(test.data)}</p>
            <p>{JSON.stringify(testMutation.data)}</p>
        </div>
    )
}