// ==========================================
// Git Utilities
// ==========================================

export interface CommitInfo {
    sha: string
    message: string
    author: string
    date: string
}

export interface BranchInfo {
    name: string
    isDefault: boolean
    lastCommit: string
}

export async function getCommits(repo: string, branch: string, limit = 10): Promise<CommitInfo[]> {
    console.log(`[Git] Getting commits for ${repo}/${branch}`)
    return []
}

export async function getBranches(repo: string): Promise<BranchInfo[]> {
    console.log(`[Git] Getting branches for ${repo}`)
    return []
}

export async function createBranch(repo: string, branch: string, from: string): Promise<void> {
    console.log(`[Git] Creating branch ${branch} from ${from} in ${repo}`)
}

export async function mergeBranch(repo: string, source: string, target: string): Promise<void> {
    console.log(`[Git] Merging ${source} into ${target} in ${repo}`)
}
