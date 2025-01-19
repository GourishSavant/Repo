

const Helper = () => {
    
    return (
        <>
        
<aside className="sidebar p-4 bg-gray-800 w-64 h-screen text-white">
    {menuItems.map((group) => (
        <div key={group.group_short_code} className="mb-4">
            {/* Group Name with Unique Icon and Dropdown */}
            <h3
                className="text-md font-semibold cursor-pointer p-2 bg-gray-700 rounded-md hover:bg-gray-600 flex items-center"
                onClick={() => toggleGroupVisibility(group.group_short_code)}
            >
                {/* Group Icon */}
                <span className="mr-3">
                    {getGroupIcon(group.group_short_code)}
                </span>

                {/* Group Name */}
                <span className="flex-grow">{group.group_name}</span>

                {/* Dropdown Toggle: `^` */}
                <span
                    className={`transform transition-transform ${
                        visibleGroups[group.group_short_code] ? 'rotate-180' : ''
                    }`}
                >
                    ^
                </span>
            </h3>

            {/* Dropdown Menu for Subcategories */}
            {visibleGroups[group.group_short_code] && (
                <ul className="ml-4 mt-2 space-y-1">
                    {group.categories.map(
                        (category) =>
                            category.can_view && (
                                <li
                                    key={category.category_short_code}
                                    className="p-2 hover:bg-gray-600 rounded-md"
                                >
                                    {/* Subcategory Link */}
                                    <a
                                        href={
                                            categoryLinks[category.category_short_code] ||
                                            "#"
                                        }
                                        className="flex items-center text-sm text-gray-300 hover:text-white"
                                    >
                                        {/* Subcategory Icon */}
                                        <span className="mr-3">
                                            {getCategoryIcon(
                                                category.category_short_code
                                            )}
                                        </span>

                                        {/* Subcategory Name */}
                                        {category.category_name}
                                    </a>
                                </li>
                            )
                    )}
                </ul>
            )}
        </div>
    ))}
</aside>
        </>
    );
}

export default Helper;



