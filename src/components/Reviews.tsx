import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    text: 'The quality is incredible! My custom design came out perfectly and the hoodie is super cozy. Got so many compliments at the Halloween party!',
    date: 'October 2024'
  },
  {
    id: 2,
    name: 'Mike R.',
    rating: 5,
    text: 'Fast shipping and amazing print quality. The hoodie fits true to size and the fabric is really soft. Will definitely order again next year!',
    date: 'October 2024'
  },
  {
    id: 3,
    name: 'Jessica L.',
    rating: 5,
    text: 'Ordered matching hoodies for my whole family. Everyone loves them! The designs are vibrant and the hoodies held up great after washing.',
    date: 'October 2024'
  },
  {
    id: 4,
    name: 'David K.',
    rating: 5,
    text: 'Best Halloween hoodie I have ever owned! The print is sharp, colors are bright, and it is warm without being too heavy. Perfect for trick-or-treating with the kids.',
    date: 'October 2024'
  },
  {
    id: 5,
    name: 'Amanda T.',
    rating: 4,
    text: 'Really happy with my purchase! The design looks exactly like the preview. Only minor thing is it took a bit longer to ship than expected, but worth the wait.',
    date: 'October 2024'
  },
  {
    id: 6,
    name: 'Ryan P.',
    rating: 5,
    text: 'Uploaded my own design and it turned out amazing! The customization process was easy and the final product exceeded my expectations.',
    date: 'October 2024'
  },
  {
    id: 7,
    name: 'Emily S.',
    rating: 5,
    text: 'Such a fun way to celebrate Halloween! The hoodie is comfortable, stylish, and the quality is top-notch. Already planning my order for next year.',
    date: 'October 2024'
  },
  {
    id: 8,
    name: 'Chris B.',
    rating: 4,
    text: 'Great hoodie overall. The material is soft and the print quality is excellent. Fits a little larger than expected but still love it!',
    date: 'October 2024'
  },
  {
    id: 9,
    name: 'Lauren W.',
    rating: 5,
    text: 'Absolutely love it! Got the pumpkin design and it is so festive. The hoodie is warm and comfortable, perfect for fall weather.',
    date: 'October 2024'
  },
  {
    id: 10,
    name: 'Jason M.',
    rating: 5,
    text: 'Impressed with the quality and durability. Washed it several times and the design still looks brand new. Will be buying more for gifts!',
    date: 'October 2024'
  },
  {
    id: 11,
    name: 'Nicole H.',
    rating: 4,
    text: 'Very satisfied with my order! The hoodie is cozy and the design is vibrant. Would give 5 stars but the sizing runs slightly big.',
    date: 'October 2024'
  },
  {
    id: 12,
    name: 'Tom D.',
    rating: 5,
    text: 'Perfect for Halloween events! The quality is outstanding and everyone asks where I got it. Customer service was also very helpful.',
    date: 'October 2024'
  }
];

export function Reviews() {
  return (
    <section id="reviews" className="py-12 md:py-16 dark:bg-gray-900 transition-colors overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          What Our Customers Say
        </motion.h2>

        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 px-4" style={{ width: 'max-content' }}>
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 transition-colors flex-shrink-0 w-80 md:w-96"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-blue-600 fill-blue-600"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.date}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6 text-sm">
          Scroll to see more reviews →
        </p>
      </div>
    </section>
  );
}
