import { Recipe } from './recipe.interface';

let id: number = 0;
export const recipes: Recipe[] = [
  {
    id: ++id,
    productId: 1,
    title: {
      en: 'Classic Cookies',
      ar: 'بسكويت كلاسيكي'
    },
    description: {
      en: 'Traditional homemade cookies that are crispy on the outside and soft on the inside. Perfect for tea time!',
      ar: 'بسكويت منزلي تقليدي مقرمش من الخارج وناعم من الداخل. مثالي لوقت الشاي!'
    },
    image: '/images/recipes/classic-cookies.jpg',
    ingredients: {
      en: [
        '2 cups all-purpose flour',
        '1 cup butter, softened',
        '3/4 cup granulated sugar',
        '1 egg',
        '1 tsp vanilla extract',
        '1/2 tsp baking soda',
        '1/2 tsp salt'
      ],
      ar: [
        'كوبان من الدقيق متعدد الاستخدامات',
        'كوب من الزبدة، طرية',
        '3/4 كوب سكر حبيبي',
        'بيضة واحدة',
        'ملعقة صغيرة من خلاصة الفانيليا',
        'نصف ملعقة صغيرة من صودا الخبز',
        'نصف ملعقة صغيرة ملح'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 375°F (190°C)',
        'Cream butter and sugar until light and fluffy',
        'Beat in egg and vanilla extract',
        'Mix in flour, baking soda, and salt',
        'Drop rounded tablespoons onto ungreased baking sheets',
        'Bake for 9-11 minutes until golden brown',
        'Cool on baking sheet for 2 minutes before removing'
      ],
      ar: [
        'سخن الفرن إلى 375 درجة فهرنهايت (190 درجة مئوية)',
        'اخفق الزبدة والسكر حتى تصبح خفيفة ورقيقة',
        'أضف البيض وخلاصة الفانيليا',
        'اخلط الدقيق وصودا الخبز والملح',
        'ضع ملاعق طعام مستديرة على صواني خبز غير مدهونة',
        'اخبز لمدة 9-11 دقيقة حتى تصبح ذهبية',
        'اتركها تبرد على صينية الخبز لمدة دقيقتين قبل الإزالة'
      ]
    },
    prepTime: 15,
    cookTime: 11,
    servings: 24,
    difficulty: {
      en: 'Easy',
      ar: 'سهل'
    },
    category: {
      en: 'Cookies',
      ar: 'بسكويت'
    }
  },
  {
    id: ++id,
    productId: 2,
    title: {
      en: 'Chocolate Cookies',
      ar: 'بسكويت الشوكولاتة'
    },
    description: {
      en: 'Rich and decadent chocolate cookies with chunks of chocolate. A chocolate lover\'s dream!',
      ar: 'بسكويت شوكولاتة غني وفاخر مع قطع من الشوكولاتة. حلم عشاق الشوكولاتة!'
    },
    image: '/images/recipes/chocolate-cookies.jpg',
    ingredients: {
      en: [
        '2 cups all-purpose flour',
        '3/4 cup cocoa powder',
        '1 cup butter, softened',
        '1 cup brown sugar',
        '2 eggs',
        '1 tsp vanilla extract',
        '1 cup chocolate chips',
        '1 tsp baking soda',
        '1/2 tsp salt'
      ],
      ar: [
        'كوبان من الدقيق متعدد الاستخدامات',
        '3/4 كوب مسحوق الكاكاو',
        'كوب من الزبدة، طرية',
        'كوب سكر بني',
        'بيضتان',
        'ملعقة صغيرة من خلاصة الفانيليا',
        'كوب من رقائق الشوكولاتة',
        'ملعقة صغيرة من صودا الخبز',
        'نصف ملعقة صغيرة ملح'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 350°F (175°C)',
        'Mix flour, cocoa, baking soda, and salt',
        'Cream butter and brown sugar',
        'Add eggs and vanilla, mix well',
        'Gradually add flour mixture',
        'Stir in chocolate chips',
        'Drop onto baking sheets and bake for 10-12 minutes'
      ],
      ar: [
        'سخن الفرن إلى 350 درجة فهرنهايت (175 درجة مئوية)',
        'اخلط الدقيق والكاكاو وصودا الخبز والملح',
        'اخفق الزبدة والسكر البني',
        'أضف البيض والفانيليا واخلط جيداً',
        'أضف خليط الدقيق تدريجياً',
        'أضف رقائق الشوكولاتة',
        'ضع على صواني الخبز واخبز لمدة 10-12 دقيقة'
      ]
    },
    prepTime: 20,
    cookTime: 12,
    servings: 30,
    difficulty: {
      en: 'Medium',
      ar: 'متوسط'
    },
    category: {
      en: 'Cookies',
      ar: 'بسكويت'
    }
  },
  {
    id: ++id,
    productId: 3,
    title: {
      en: 'Blueberry Cookies',
      ar: 'بسكويت التوت الأزرق'
    },
    description: {
      en: 'Delicious cookies bursting with fresh blueberry flavor. Sweet and tangy!',
      ar: 'بسكويت لذيذ مليء بنكهة التوت الأزرق الطازجة. حلو ومنعش!'
    },
    image: '/images/recipes/blueberry-cookies.jpg',
    ingredients: {
      en: [
        '2 cups all-purpose flour',
        '1 cup butter, softened',
        '3/4 cup sugar',
        '1 egg',
        '1 cup fresh blueberries',
        '1 tsp vanilla extract',
        '1/2 tsp baking powder',
        '1/4 tsp salt'
      ],
      ar: [
        'كوبان من الدقيق متعدد الاستخدامات',
        'كوب من الزبدة، طرية',
        '3/4 كوب سكر',
        'بيضة واحدة',
        'كوب من التوت الأزرق الطازج',
        'ملعقة صغيرة من خلاصة الفانيليا',
        'نصف ملعقة صغيرة من مسحوق الخبز',
        'ربع ملعقة صغيرة ملح'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 375°F (190°C)',
        'Cream butter and sugar',
        'Add egg and vanilla',
        'Mix in flour, baking powder, and salt',
        'Gently fold in blueberries',
        'Drop onto baking sheets',
        'Bake for 12-15 minutes'
      ],
      ar: [
        'سخن الفرن إلى 375 درجة فهرنهايت (190 درجة مئوية)',
        'اخفق الزبدة والسكر',
        'أضف البيض والفانيليا',
        'اخلط الدقيق ومسحوق الخبز والملح',
        'أضف التوت الأزرق برفق',
        'ضع على صواني الخبز',
        'اخبز لمدة 12-15 دقيقة'
      ]
    },
    prepTime: 20,
    cookTime: 15,
    servings: 24,
    difficulty: {
      en: 'Medium',
      ar: 'متوسط'
    },
    category: {
      en: 'Cookies',
      ar: 'بسكويت'
    }
  },
  {
    id: ++id,
    productId: 4,
    title: {
      en: 'Pistachio Cookies',
      ar: 'بسكويت الفستق'
    },
    description: {
      en: 'Elegant cookies with the rich, nutty flavor of pistachios. Perfect for special occasions!',
      ar: 'بسكويت أنيق بنكهة الفستق الغنية. مثالي للمناسبات الخاصة!'
    },
    image: '/images/recipes/pistachio-cookies.jpg',
    ingredients: {
      en: [
        '2 cups all-purpose flour',
        '1 cup butter, softened',
        '3/4 cup sugar',
        '1 cup shelled pistachios, chopped',
        '1 egg',
        '1 tsp vanilla extract',
        '1/2 tsp baking soda',
        '1/4 tsp salt'
      ],
      ar: [
        'كوبان من الدقيق متعدد الاستخدامات',
        'كوب من الزبدة، طرية',
        '3/4 كوب سكر',
        'كوب من الفستق المقشر والمفروم',
        'بيضة واحدة',
        'ملعقة صغيرة من خلاصة الفانيليا',
        'نصف ملعقة صغيرة من صودا الخبز',
        'ربع ملعقة صغيرة ملح'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 350°F (175°C)',
        'Cream butter and sugar until fluffy',
        'Beat in egg and vanilla',
        'Mix in flour, baking soda, and salt',
        'Fold in chopped pistachios',
        'Shape into cookies and place on baking sheet',
        'Bake for 10-12 minutes until edges are golden'
      ],
      ar: [
        'سخن الفرن إلى 350 درجة فهرنهايت (175 درجة مئوية)',
        'اخفق الزبدة والسكر حتى تصبح رقيقة',
        'أضف البيض والفانيليا',
        'اخلط الدقيق وصودا الخبز والملح',
        'أضف الفستق المفروم',
        'شكل البسكويت وضع على صينية الخبز',
        'اخبز لمدة 10-12 دقيقة حتى تصبح الحواف ذهبية'
      ]
    },
    prepTime: 25,
    cookTime: 12,
    servings: 30,
    difficulty: {
      en: 'Medium',
      ar: 'متوسط'
    },
    category: {
      en: 'Cookies',
      ar: 'بسكويت'
    }
  },
  {
    id: ++id,
    productId: 5,
    title: {
      en: 'Cinnamon Cookies',
      ar: 'بسكويت القرفة'
    },
    description: {
      en: 'Warm and spicy cookies with the perfect amount of cinnamon. Comforting and delicious!',
      ar: 'بسكويت دافئ وحار بكمية مثالية من القرفة. مريح ولذيذ!'
    },
    image: '/images/recipes/cinnamon-cookies.jpg',
    ingredients: {
      en: [
        '2 cups all-purpose flour',
        '1 cup butter, softened',
        '3/4 cup sugar',
        '2 tsp ground cinnamon',
        '1 egg',
        '1 tsp vanilla extract',
        '1/2 tsp baking soda',
        '1/4 tsp salt'
      ],
      ar: [
        'كوبان من الدقيق متعدد الاستخدامات',
        'كوب من الزبدة، طرية',
        '3/4 كوب سكر',
        'ملعقتان صغيرتان من القرفة المطحونة',
        'بيضة واحدة',
        'ملعقة صغيرة من خلاصة الفانيليا',
        'نصف ملعقة صغيرة من صودا الخبز',
        'ربع ملعقة صغيرة ملح'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 375°F (190°C)',
        'Mix flour, cinnamon, baking soda, and salt',
        'Cream butter and sugar',
        'Add egg and vanilla',
        'Combine wet and dry ingredients',
        'Drop onto baking sheets',
        'Bake for 9-11 minutes'
      ],
      ar: [
        'سخن الفرن إلى 375 درجة فهرنهايت (190 درجة مئوية)',
        'اخلط الدقيق والقرفة وصودا الخبز والملح',
        'اخفق الزبدة والسكر',
        'أضف البيض والفانيليا',
        'امزج المكونات الرطبة والجافة',
        'ضع على صواني الخبز',
        'اخبز لمدة 9-11 دقيقة'
      ]
    },
    prepTime: 15,
    cookTime: 11,
    servings: 24,
    difficulty: {
      en: 'Easy',
      ar: 'سهل'
    },
    category: {
      en: 'Cookies',
      ar: 'بسكويت'
    }
  },
  {
    id: ++id,
    productId: 6,
    title: {
      en: 'Fluffy Pancakes',
      ar: 'فطائر رقيقة'
    },
    description: {
      en: 'Light and airy pancakes that are perfect for breakfast. Serve with maple syrup and butter!',
      ar: 'فطائر خفيفة وناعمة مثالية للإفطار. قدمها مع شراب القيقب والزبدة!'
    },
    image: '/images/recipes/fluffy-pancakes.jpg',
    ingredients: {
      en: [
        '1 1/2 cups all-purpose flour',
        '3 1/2 tsp baking powder',
        '1 tsp salt',
        '1 tbsp white sugar',
        '1 1/4 cups milk',
        '1 egg',
        '3 tbsp butter, melted'
      ],
      ar: [
        'كوب ونصف من الدقيق متعدد الاستخدامات',
        '3 ملاعق صغيرة ونصف من مسحوق الخبز',
        'ملعقة صغيرة ملح',
        'ملعقة كبيرة سكر أبيض',
        'كوب وربع من الحليب',
        'بيضة واحدة',
        '3 ملاعق كبيرة زبدة، مذابة'
      ]
    },
    instructions: {
      en: [
        'Mix dry ingredients in a large bowl',
        'Make a well and add milk, egg, and melted butter',
        'Mix until smooth',
        'Heat a griddle or frying pan over medium heat',
        'Pour batter onto griddle',
        'Cook until bubbles form, then flip',
        'Cook until golden brown on both sides'
      ],
      ar: [
        'اخلط المكونات الجافة في وعاء كبير',
        'اصنع حفرة وأضف الحليب والبيض والزبدة المذابة',
        'اخلط حتى تصبح ناعمة',
        'سخن صينية أو مقلاة على نار متوسطة',
        'صب الخليط على الصينية',
        'اطبخ حتى تتكون الفقاعات، ثم اقلب',
        'اطبخ حتى تصبح ذهبية من كلا الجانبين'
      ]
    },
    prepTime: 10,
    cookTime: 15,
    servings: 6,
    difficulty: {
      en: 'Easy',
      ar: 'سهل'
    },
    category: {
      en: 'Breakfast',
      ar: 'إفطار'
    }
  },
  {
    id: ++id,
    productId: 7,
    title: {
      en: 'Chocolate Muffins',
      ar: 'كعك الشوكولاتة'
    },
    description: {
      en: 'Moist and chocolatey muffins that are perfect for breakfast or a snack. Rich and satisfying!',
      ar: 'كعك رطب بالشوكولاتة مثالي للإفطار أو كوجبة خفيفة. غني ومشبع!'
    },
    image: '/images/recipes/chocolate-muffins.jpg',
    ingredients: {
      en: [
        '2 cups all-purpose flour',
        '1/2 cup cocoa powder',
        '1 cup sugar',
        '2 tsp baking powder',
        '1/2 tsp salt',
        '1 cup milk',
        '1/2 cup vegetable oil',
        '2 eggs',
        '1 tsp vanilla extract',
        '1/2 cup chocolate chips'
      ],
      ar: [
        'كوبان من الدقيق متعدد الاستخدامات',
        'نصف كوب مسحوق الكاكاو',
        'كوب سكر',
        'ملعقتان صغيرتان من مسحوق الخبز',
        'نصف ملعقة صغيرة ملح',
        'كوب حليب',
        'نصف كوب زيت نباتي',
        'بيضتان',
        'ملعقة صغيرة من خلاصة الفانيليا',
        'نصف كوب رقائق الشوكولاتة'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 375°F (190°C)',
        'Mix dry ingredients in a large bowl',
        'In another bowl, mix wet ingredients',
        'Combine wet and dry ingredients',
        'Fold in chocolate chips',
        'Fill muffin cups 2/3 full',
        'Bake for 18-20 minutes'
      ],
      ar: [
        'سخن الفرن إلى 375 درجة فهرنهايت (190 درجة مئوية)',
        'اخلط المكونات الجافة في وعاء كبير',
        'في وعاء آخر، اخلط المكونات الرطبة',
        'امزج المكونات الرطبة والجافة',
        'أضف رقائق الشوكولاتة',
        'املأ أكواب الكعك حتى 2/3',
        'اخبز لمدة 18-20 دقيقة'
      ]
    },
    prepTime: 15,
    cookTime: 20,
    servings: 12,
    difficulty: {
      en: 'Easy',
      ar: 'سهل'
    },
    category: {
      en: 'Muffins',
      ar: 'كعك'
    }
  },
  {
    id: ++id,
    productId: 8,
    title: {
      en: 'Red Velvet Cupcake',
      ar: 'كب كيك المخمل الأحمر'
    },
    description: {
      en: 'Classic red velvet cupcakes with cream cheese frosting. Elegant and delicious!',
      ar: 'كب كيك المخمل الأحمر الكلاسيكي مع صقيل الجبن الكريمي. أنيق ولذيذ!'
    },
    image: '/images/recipes/red-velvet-cupcake.jpg',
    ingredients: {
      en: [
        '2 1/2 cups all-purpose flour',
        '1 1/2 cups sugar',
        '1 tsp baking soda',
        '1 tsp salt',
        '1 tsp cocoa powder',
        '1 1/2 cups vegetable oil',
        '1 cup buttermilk',
        '2 eggs',
        '2 tbsp red food coloring',
        '1 tsp vanilla extract',
        '1 tsp white vinegar'
      ],
      ar: [
        'كوبان ونصف من الدقيق متعدد الاستخدامات',
        'كوب ونصف سكر',
        'ملعقة صغيرة من صودا الخبز',
        'ملعقة صغيرة ملح',
        'ملعقة صغيرة مسحوق الكاكاو',
        'كوب ونصف زيت نباتي',
        'كوب لبن رائب',
        'بيضتان',
        'ملعقتان كبيرتان من صبغة الطعام الحمراء',
        'ملعقة صغيرة من خلاصة الفانيليا',
        'ملعقة صغيرة خل أبيض'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 350°F (175°C)',
        'Mix dry ingredients in a bowl',
        'Mix wet ingredients in another bowl',
        'Combine both mixtures',
        'Add food coloring and vinegar',
        'Fill cupcake liners 2/3 full',
        'Bake for 18-22 minutes',
        'Cool completely before frosting'
      ],
      ar: [
        'سخن الفرن إلى 350 درجة فهرنهايت (175 درجة مئوية)',
        'اخلط المكونات الجافة في وعاء',
        'اخلط المكونات الرطبة في وعاء آخر',
        'امزج كلا الخليطين',
        'أضف صبغة الطعام والخل',
        'املأ أكواب الكب كيك حتى 2/3',
        'اخبز لمدة 18-22 دقيقة',
        'اتركها تبرد تماماً قبل التزيين'
      ]
    },
    prepTime: 20,
    cookTime: 22,
    servings: 24,
    difficulty: {
      en: 'Medium',
      ar: 'متوسط'
    },
    category: {
      en: 'Cupcakes',
      ar: 'كب كيك'
    }
  },
  {
    id: ++id,
    productId: 9,
    title: {
      en: 'Cinnamon Roll',
      ar: 'لفائف القرفة'
    },
    description: {
      en: 'Soft and gooey cinnamon rolls with cream cheese glaze. Perfect for breakfast or dessert!',
      ar: 'لفائف قرفة ناعمة ولزجة مع صقيل الجبن الكريمي. مثالية للإفطار أو الحلوى!'
    },
    image: '/images/recipes/cinnamon-roll.jpg',
    ingredients: {
      en: [
        '3 1/4 cups all-purpose flour',
        '1 package active dry yeast',
        '1 cup warm milk',
        '1/4 cup sugar',
        '1/4 cup butter, melted',
        '1 egg',
        '1 tsp salt',
        '1/2 cup butter, softened',
        '1 cup brown sugar',
        '2 1/2 tbsp ground cinnamon'
      ],
      ar: [
        '3 أكواب وربع من الدقيق متعدد الاستخدامات',
        'علبة خميرة جافة نشطة',
        'كوب حليب دافئ',
        'ربع كوب سكر',
        'ربع كوب زبدة، مذابة',
        'بيضة واحدة',
        'ملعقة صغيرة ملح',
        'نصف كوب زبدة، طرية',
        'كوب سكر بني',
        'ملعقتان كبيرتان ونصف من القرفة المطحونة'
      ]
    },
    instructions: {
      en: [
        'Dissolve yeast in warm milk',
        'Mix flour, sugar, salt',
        'Add milk mixture, melted butter, and egg',
        'Knead until smooth',
        'Let rise for 1 hour',
        'Roll out dough and spread with butter, sugar, and cinnamon',
        'Roll up and cut into rolls',
        'Bake at 375°F (190°C) for 20-25 minutes'
      ],
      ar: [
        'ذوب الخميرة في الحليب الدافئ',
        'اخلط الدقيق والسكر والملح',
        'أضف خليط الحليب والزبدة المذابة والبيض',
        'اعجن حتى تصبح ناعمة',
        'اتركها ترتفع لمدة ساعة',
        'افرد العجينة وادهنها بالزبدة والسكر والقرفة',
        'لفها وقطعها إلى لفات',
        'اخبز على 375 درجة فهرنهايت (190 درجة مئوية) لمدة 20-25 دقيقة'
      ]
    },
    prepTime: 30,
    cookTime: 25,
    servings: 12,
    difficulty: {
      en: 'Hard',
      ar: 'صعب'
    },
    category: {
      en: 'Pastries',
      ar: 'معجنات'
    }
  },
  {
    id: ++id,
    productId: 10,
    title: {
      en: 'Chocolate Donut',
      ar: 'دونات الشوكولاتة'
    },
    description: {
      en: 'Classic chocolate glazed donuts that are soft and fluffy. A favorite treat for all ages!',
      ar: 'دونات الشوكولاتة المزججة الكلاسيكية الناعمة والرقيقة. حلوى مفضلة لجميع الأعمار!'
    },
    image: '/images/recipes/chocolate-donut.jpg',
    ingredients: {
      en: [
        '2 cups all-purpose flour',
        '1/2 cup sugar',
        '1 tsp baking powder',
        '1/2 tsp salt',
        '1/2 cup milk',
        '2 eggs',
        '2 tbsp butter, melted',
        '1 tsp vanilla extract',
        'Vegetable oil for frying',
        '1 cup powdered sugar',
        '2 tbsp cocoa powder',
        '3-4 tbsp milk'
      ],
      ar: [
        'كوبان من الدقيق متعدد الاستخدامات',
        'نصف كوب سكر',
        'ملعقة صغيرة من مسحوق الخبز',
        'نصف ملعقة صغيرة ملح',
        'نصف كوب حليب',
        'بيضتان',
        'ملعقتان كبيرتان زبدة، مذابة',
        'ملعقة صغيرة من خلاصة الفانيليا',
        'زيت نباتي للقلي',
        'كوب سكر بودرة',
        'ملعقتان كبيرتان مسحوق الكاكاو',
        '3-4 ملاعق كبيرة حليب'
      ]
    },
    instructions: {
      en: [
        'Mix dry ingredients in a bowl',
        'In another bowl, mix wet ingredients',
        'Combine both mixtures',
        'Knead until smooth',
        'Roll out and cut into donut shapes',
        'Heat oil to 350°F (175°C)',
        'Fry donuts for 1-2 minutes per side',
        'Mix glaze ingredients and dip cooled donuts'
      ],
      ar: [
        'اخلط المكونات الجافة في وعاء',
        'في وعاء آخر، اخلط المكونات الرطبة',
        'امزج كلا الخليطين',
        'اعجن حتى تصبح ناعمة',
        'افرد وقطع إلى أشكال دونات',
        'سخن الزيت إلى 350 درجة فهرنهايت (175 درجة مئوية)',
        'اقلي الدونات لمدة 1-2 دقيقة لكل جانب',
        'اخلط مكونات الصقيل واغمس الدونات المبردة'
      ]
    },
    prepTime: 25,
    cookTime: 15,
    servings: 12,
    difficulty: {
      en: 'Medium',
      ar: 'متوسط'
    },
    category: {
      en: 'Donuts',
      ar: 'دونات'
    }
  },
  {
    id: ++id,
    productId: 11,
    title: {
      en: 'Chocolate Cake',
      ar: 'كعكة الشوكولاتة'
    },
    description: {
      en: 'Rich and moist chocolate cake that is perfect for any celebration. Decadent and delicious!',
      ar: 'كعكة شوكولاتة غنية ورطبة مثالية لأي احتفال. فاخرة ولذيذة!'
    },
    image: '/images/recipes/chocolate-cake.jpg',
    ingredients: {
      en: [
        '2 cups all-purpose flour',
        '2 cups sugar',
        '3/4 cup cocoa powder',
        '2 tsp baking soda',
        '1 tsp baking powder',
        '1 tsp salt',
        '2 eggs',
        '1 cup buttermilk',
        '1 cup strong black coffee',
        '1/2 cup vegetable oil',
        '1 tsp vanilla extract'
      ],
      ar: [
        'كوبان من الدقيق متعدد الاستخدامات',
        'كوبان سكر',
        '3/4 كوب مسحوق الكاكاو',
        'ملعقتان صغيرتان من صودا الخبز',
        'ملعقة صغيرة من مسحوق الخبز',
        'ملعقة صغيرة ملح',
        'بيضتان',
        'كوب لبن رائب',
        'كوب قهوة سوداء قوية',
        'نصف كوب زيت نباتي',
        'ملعقة صغيرة من خلاصة الفانيليا'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 350°F (175°C)',
        'Mix all dry ingredients in a large bowl',
        'Add eggs, buttermilk, coffee, oil, and vanilla',
        'Beat on medium speed for 2 minutes',
        'Pour into greased cake pans',
        'Bake for 30-35 minutes',
        'Cool completely before frosting'
      ],
      ar: [
        'سخن الفرن إلى 350 درجة فهرنهايت (175 درجة مئوية)',
        'اخلط جميع المكونات الجافة في وعاء كبير',
        'أضف البيض واللبن الرائب والقهوة والزيت والفانيليا',
        'اخفق على سرعة متوسطة لمدة دقيقتين',
        'صب في صواني الكعك المدهونة',
        'اخبز لمدة 30-35 دقيقة',
        'اتركها تبرد تماماً قبل التزيين'
      ]
    },
    prepTime: 20,
    cookTime: 35,
    servings: 12,
    difficulty: {
      en: 'Medium',
      ar: 'متوسط'
    },
    category: {
      en: 'Cakes',
      ar: 'كعك'
    }
  },
  {
    id: ++id,
    productId: 12,
    title: {
      en: 'Red Velvet Cake',
      ar: 'كعكة المخمل الأحمر'
    },
    description: {
      en: 'Elegant red velvet cake with cream cheese frosting. A classic favorite for special occasions!',
      ar: 'كعكة المخمل الأحمر الأنيقة مع صقيل الجبن الكريمي. كلاسيكية مفضلة للمناسبات الخاصة!'
    },
    image: '/images/recipes/red-velvet-cake.png',
    ingredients: {
      en: [
        '2 1/2 cups all-purpose flour',
        '1 1/2 cups sugar',
        '1 tsp baking soda',
        '1 tsp salt',
        '1 tsp cocoa powder',
        '1 1/2 cups vegetable oil',
        '1 cup buttermilk',
        '2 eggs',
        '2 tbsp red food coloring',
        '1 tsp vanilla extract',
        '1 tsp white vinegar'
      ],
      ar: [
        'كوبان ونصف من الدقيق متعدد الاستخدامات',
        'كوب ونصف سكر',
        'ملعقة صغيرة من صودا الخبز',
        'ملعقة صغيرة ملح',
        'ملعقة صغيرة مسحوق الكاكاو',
        'كوب ونصف زيت نباتي',
        'كوب لبن رائب',
        'بيضتان',
        'ملعقتان كبيرتان من صبغة الطعام الحمراء',
        'ملعقة صغيرة من خلاصة الفانيليا',
        'ملعقة صغيرة خل أبيض'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 350°F (175°C)',
        'Mix dry ingredients together',
        'Mix wet ingredients in another bowl',
        'Combine both mixtures',
        'Add food coloring and vinegar',
        'Pour into cake pans',
        'Bake for 25-30 minutes',
        'Cool and frost with cream cheese frosting'
      ],
      ar: [
        'سخن الفرن إلى 350 درجة فهرنهايت (175 درجة مئوية)',
        'اخلط المكونات الجافة معاً',
        'اخلط المكونات الرطبة في وعاء آخر',
        'امزج كلا الخليطين',
        'أضف صبغة الطعام والخل',
        'صب في صواني الكعك',
        'اخبز لمدة 25-30 دقيقة',
        'اتركها تبرد وزينها بصقيل الجبن الكريمي'
      ]
    },
    prepTime: 25,
    cookTime: 30,
    servings: 16,
    difficulty: {
      en: 'Medium',
      ar: 'متوسط'
    },
    category: {
      en: 'Cakes',
      ar: 'كعك'
    }
  },
  {
    id: ++id,
    productId: 13,
    title: {
      en: 'Cheesecake',
      ar: 'كعكة الجبن'
    },
    description: {
      en: 'Creamy and smooth cheesecake with a graham cracker crust. A timeless dessert favorite!',
      ar: 'كعكة جبن كريمية وناعمة مع قشرة البسكويت. حلوى مفضلة خالدة!'
    },
    image: '/images/recipes/cheesecake.jpg',
    ingredients: {
      en: [
        '1 1/2 cups graham cracker crumbs',
        '1/4 cup butter, melted',
        '3 (8 oz) packages cream cheese, softened',
        '1 cup sugar',
        '3 eggs',
        '1 cup sour cream',
        '1 tsp vanilla extract'
      ],
      ar: [
        'كوب ونصف من فتات بسكويت جراهام',
        'ربع كوب زبدة، مذابة',
        '3 علب (8 أونصة) جبن كريمي، طرية',
        'كوب سكر',
        '3 بيضات',
        'كوب كريمة حامضة',
        'ملعقة صغيرة من خلاصة الفانيليا'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 325°F (165°C)',
        'Mix graham cracker crumbs and butter for crust',
        'Press into bottom of springform pan',
        'Beat cream cheese and sugar until smooth',
        'Add eggs one at a time',
        'Mix in sour cream and vanilla',
        'Pour over crust',
        'Bake for 55-60 minutes',
        'Cool completely before serving'
      ],
      ar: [
        'سخن الفرن إلى 325 درجة فهرنهايت (165 درجة مئوية)',
        'اخلط فتات بسكويت جراهام والزبدة للقشرة',
        'اضغط في قاع صينية القالب القابل للفك',
        'اخفق الجبن الكريمي والسكر حتى يصبح ناعماً',
        'أضف البيض واحداً تلو الآخر',
        'اخلط الكريمة الحامضة والفانيليا',
        'صب على القشرة',
        'اخبز لمدة 55-60 دقيقة',
        'اتركها تبرد تماماً قبل التقديم'
      ]
    },
    prepTime: 30,
    cookTime: 60,
    servings: 12,
    difficulty: {
      en: 'Hard',
      ar: 'صعب'
    },
    category: {
      en: 'Cakes',
      ar: 'كعك'
    }
  },
  {
    id: ++id,
    productId: 14,
    title: {
      en: 'Lunchbox Cake',
      ar: 'كعكة صندوق الغداء'
    },
    description: {
      en: 'Small, perfectly portioned cakes that fit in a lunchbox. Sweet treats for any time of day!',
      ar: 'كعك صغير بحجم مثالي يناسب صندوق الغداء. حلوى حلوة لأي وقت من اليوم!'
    },
    image: '/images/recipes/lunchbox-cake.jpg',
    ingredients: {
      en: [
        '1 1/2 cups all-purpose flour',
        '1 cup sugar',
        '1/2 cup butter, softened',
        '2 eggs',
        '1/2 cup milk',
        '1 tsp baking powder',
        '1/2 tsp vanilla extract',
        '1/4 tsp salt'
      ],
      ar: [
        'كوب ونصف من الدقيق متعدد الاستخدامات',
        'كوب سكر',
        'نصف كوب زبدة، طرية',
        'بيضتان',
        'نصف كوب حليب',
        'ملعقة صغيرة من مسحوق الخبز',
        'نصف ملعقة صغيرة من خلاصة الفانيليا',
        'ربع ملعقة صغيرة ملح'
      ]
    },
    instructions: {
      en: [
        'Preheat oven to 350°F (175°C)',
        'Cream butter and sugar',
        'Add eggs one at a time',
        'Mix in flour, baking powder, and salt',
        'Add milk and vanilla',
        'Pour into small cake pans',
        'Bake for 20-25 minutes'
      ],
      ar: [
        'سخن الفرن إلى 350 درجة فهرنهايت (175 درجة مئوية)',
        'اخفق الزبدة والسكر',
        'أضف البيض واحداً تلو الآخر',
        'اخلط الدقيق ومسحوق الخبز والملح',
        'أضف الحليب والفانيليا',
        'صب في صواني كعك صغيرة',
        'اخبز لمدة 20-25 دقيقة'
      ]
    },
    prepTime: 15,
    cookTime: 25,
    servings: 6,
    difficulty: {
      en: 'Easy',
      ar: 'سهل'
    },
    category: {
      en: 'Cakes',
      ar: 'كعك'
    }
  },
  {
    id: ++id,
    productId: 15,
    title: {
      en: 'Honeycomb Bread',
      ar: 'خبز العسل'
    },
    description: {
      en: 'Sweet honeycomb-shaped bread that is soft and delicious. Perfect with tea or coffee!',
      ar: 'خبز حلو على شكل قرص العسل ناعم ولذيذ. مثالي مع الشاي أو القهوة!'
    },
    image: '/images/recipes/honeycomb-bread.jpg',
    ingredients: {
      en: [
        '3 cups all-purpose flour',
        '1 package active dry yeast',
        '1 cup warm water',
        '2 tbsp honey',
        '2 tbsp butter, melted',
        '1 tsp salt',
        '1 egg'
      ],
      ar: [
        '3 أكواب من الدقيق متعدد الاستخدامات',
        'علبة خميرة جافة نشطة',
        'كوب ماء دافئ',
        'ملعقتان كبيرتان عسل',
        'ملعقتان كبيرتان زبدة، مذابة',
        'ملعقة صغيرة ملح',
        'بيضة واحدة'
      ]
    },
    instructions: {
      en: [
        'Dissolve yeast in warm water',
        'Mix flour, salt, and honey',
        'Add yeast mixture and melted butter',
        'Knead until smooth and elastic',
        'Let rise for 1 hour',
        'Shape into honeycomb pattern',
        'Bake at 375°F (190°C) for 25-30 minutes'
      ],
      ar: [
        'ذوب الخميرة في الماء الدافئ',
        'اخلط الدقيق والملح والعسل',
        'أضف خليط الخميرة والزبدة المذابة',
        'اعجن حتى تصبح ناعمة ومرنة',
        'اتركها ترتفع لمدة ساعة',
        'شكل على نمط قرص العسل',
        'اخبز على 375 درجة فهرنهايت (190 درجة مئوية) لمدة 25-30 دقيقة'
      ]
    },
    prepTime: 20,
    cookTime: 30,
    servings: 8,
    difficulty: {
      en: 'Medium',
      ar: 'متوسط'
    },
    category: {
      en: 'Bread',
      ar: 'خبز'
    }
  }
];

