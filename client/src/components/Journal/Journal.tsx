import React from 'react'
import { IJournal } from '../../typing/data'

interface JProps {journal: IJournal}

export default function JournalItem({journal} : JProps) {
    return (
        <div>
            {journal.title}
        </div>
    )
}
