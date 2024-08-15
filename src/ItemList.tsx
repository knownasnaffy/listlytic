import { Card } from './components/ui/card'
import { User } from 'lucide-react'

export interface Item {
  id: number
  name: string
}

const ItemList = ({ items }: { items: Item[] }) => {
  return (
    <ul className='space-y-2'>
      {items.length > 0 ? (
        items.map(item => (
          <li key={item.id}>
            <Card className='py-2 px-4 font-normal inline-flex w-full gap-2 items-center'>
              <User className='h-4 w-4 ' /> {item.name}
            </Card>
          </li>
        ))
      ) : (
        <li className='text-center text-muted-foreground'>
          No one like that over here {'>.<'}
        </li>
      )}
    </ul>
  )
}

export default ItemList
