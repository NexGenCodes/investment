// src/hooks/useInvestments.ts
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useInvestments() {
  const { data, error, isLoading } = useSWR('/api/investments', fetcher, {
    refreshInterval: 60000 // Refresh every minute
  })

  return {
    investments: data,
    isLoading,
    isError: error
  }
}