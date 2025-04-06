
import Sidenav from './Sidenav'
import Jobcard from '../utils/Jobcard'

const JobListings = () => {
    return (
        <div className='max-w-7xl mx-auto my-20 flex gap-20'>
            <div className='w-2/5'>
                <Sidenav />
            </div>
            <div className='w-full'>
                <Jobcard />
            </div>

        </div>
    )
}

export default JobListings