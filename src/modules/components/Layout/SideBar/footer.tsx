import { motion } from 'framer-motion'
import Penguin from 'src/public/image/penguin-svgrepo-com.svg'

const SideBarFooter = () => {
  return (
    <motion.div
      // てくてく歩く
      animate={{
        x: ['100%', '-2%'],
      }}
      transition={{
        duration: 10,
        delay: 2,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      <motion.img
        src={Penguin.src}
        alt='penguin'
        style={{ width: '10%', height: '10%', objectFit: 'contain' }}
      />
    </motion.div>
  )
}

export default SideBarFooter
