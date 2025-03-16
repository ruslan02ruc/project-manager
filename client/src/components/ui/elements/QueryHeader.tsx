import { ArrowDownUp, Filter } from 'lucide-react'

import { Button } from '../common/Button'
import { Input } from '../common/Input'

export default function QueryHeader() {
	return (
		<div className='flex justify-between py-4'>
			<Input placeholder='Фильтрация по названию...' className='max-w-52' />

			<div>
				<Button variant='outline'>
					<Filter /> Фильтр
				</Button>
				<Button variant='outline'>
					<ArrowDownUp /> Сортировка
				</Button>
			</div>
		</div>
	)
}
