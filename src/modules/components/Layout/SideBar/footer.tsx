import { motion } from 'framer-motion'

const SideBarFooter = () => {
  return (
    <motion.div
      // てくてく歩く
      animate={{
        x: ['110%', '-10%'],
      }}
      transition={{
        duration: 10,
        delay: 2,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      <motion.img
        src={'/penguin-svgrepo-com.svg'}
        alt='penguin'
        style={{ width: '10%', height: '10%', objectFit: 'contain' }}
      />
    </motion.div>
  )
}

export default SideBarFooter
