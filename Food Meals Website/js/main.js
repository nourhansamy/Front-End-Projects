let meals = [];
let categories = [];
let areas = [];
let ingredients = [];
const sideBarWidth = $("#side-bar-open").outerWidth();
$(document).ready(async function () {
    $("#side-bar-open").css({
        left: -sideBarWidth,
    });
    // $("#meal-recipe").hide();
    // $("#categories-section").hide();s
    // $("#search-section").hide();
    // $("#contact-us-section").hide();
    // $('section').not('#all-meals-section').hide();
    // Get All Meals
    // await getAllMeals();
});
$(document).ready(function () {
    $('#loading').fadeOut(1000, async function () {
        $('body').css('overflow', 'visible');
        await getAllMeals();
        // $('#side-bar').css("display", "block");
    });
})
async function getAllMeals(serchValue = "") {
    // console.log("getAllMeals");
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${serchValue}`
    );
    // console.log("response:", response);
    const data = await response.json();
    // console.log("data", data);
    meals = data.meals;
    // console.log("meals", meals);
    displayMeals(meals);
}
function displayMeals(mealsArr) {
    var cartona = "";
    for (let i = 0; i < mealsArr.length; i++) {
        // console.log("meals:", meals[i]);
        cartona += `       
        <div class="col-md-6 col-lg-3">
             <div class="meal rounded position-relative"  onmouseenter='mouseenter("${[
                i,
            ]}")'
             onmouseleave='mouseleave("${[i]}")'
             onclick='getMealRecipe("${mealsArr[i].idMeal}")'>
                  <a href="#"><img class="w-100 rounded" src="${mealsArr[i].strMealThumb
            }" alt=""></a>
                  <div class="w-100 h-0 bg-white position-absolute rounded meal-layer d-flex justify-content-right align-items-center">
                  </div>
             </div>

        </div>`;
    }
    $(".meals").html(cartona);
    $("section").not('#all-meals-section').hide(500, function () {
        $("#all-meals-section").fadeIn(500);
    });
    // $("#all-meals-section").fadeIn(500);
    // $('#all-meals-section').css("display", "block");

    // $("#categories-section").hide(1000, function () {
    //     $("#areas-section").hide(500);
    //     $("#ingredients-section").hide(500);
    //     $("#all-meals-section").show(500);
    // });
}
function mouseenter(mealIndex) {
    // console.log("mouseenter mealIndex:", mealIndex);
    $(".meal-layer")
        .eq(mealIndex)
        .html(`<h2 class="ms-2">${meals[mealIndex].strMeal}</h2>`);
    $(".meal-layer").eq(mealIndex).animate({ top: "0" }, 500);
}

function mouseleave(mealIndex) {
    // console.log("mouseleave mealIndex:", mealIndex);
    const width = $(".meal-layer").outerWidth();
    $(".meal-layer").eq(mealIndex).animate({ top: width }, 500);
}

$(".settings").click(function (e) {
    // console.log("settings clicked");
    // console.log('scrollTop:', $(window).scrollTop);
    $("#side-bar-open").animate(
        {
            left: 0,
        },
        500
    );
    $("#side-bar").animate(
        {
            left: sideBarWidth,
        },
        500
    );
    new WOW().init();
    animateList();
    // console.log('listtttt', $('.side-bar-list li').eq(0));
    // let topValue = 0;
    // let time = 3000;
    // for (let i = 0; i < $('.side-bar-list li').length; i++) {
    //     const element = $('.side-bar-list li').eq(i);
    //     console.log("element li:", element);
    //     const topVal = `${topValue}px`;
    //     $('.side-bar-list li').eq(i).animate({
    //         'opacity': "1", "top": topVal
    //     }, `${time} * (i + 1)`)
    //     topValue += 30;
    // }
    // $('.side-bar-list li').eq(0).animate({
    //     'opacity': "1", "top": "0px"
    // }, 1000)
    //     $("#side-bar-open").html(`
    //   <div class="social-icons">
    //   <a><i class="fab fa-facebook-f"></i></a>
    //   <a><i class="fab fa-twitter"></i></a>
    //   <a><i class="fas fa-globe"></i></a>
    //   <div class="copy-rights">
    // Copyright Â© 2019 All Rights Reserved.
    //   </div>
    //   </div>
    //   `);
    $(".settings").css("display", "none");
    $(".close").removeClass("d-none");
});

function closeSideBar() {
    // console.log("open");
    // $('.side-bar-list li').eq(0).animate({
    //     'opacity': "0", "top": "200px"
    // }, 1000)
    hideList();
    $("#side-bar-open").animate(
        {
            left: -sideBarWidth,
        },
        1000
    );
    $("#side-bar").animate(
        {
            left: 0,
        },
        1000
    );
    $(".settings").css("display", "block");
    $(".close").addClass("d-none");
}
$(".close").click(closeSideBar);

async function getMealRecipe(meal) {
    // show meal-recipe section
    // $("#all-meals-section").fadeOut(500);
    $("section").not('#meal-recipe').hide(500, function () {
        $("#meal-recipe").fadeIn(500);
    });
    // $("#meal-recipe").fadeIn(500);
    // console.log("meal:", meal);
    // get meal details
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`
    );
    // console.log("response:", response);
    const mealData = await response.json();
    // console.log("meal details:", mealData);
    const mealDetails = mealData.meals[0];
    // console.log("mealDetails", mealDetails);
    displayMealDetails(mealDetails);
}
function displayMealDetails(meal) {
    // console.log('displayMealDetails meal:', meal)
    let mealImage = "";
    mealImage += `
    <img class="w-100 d-block" src="${meal.strMealThumb}" alt="" srcset="">
    <h2 class="text-center text-white">${meal.strMeal}</h2>
    `;
    $(".meal-image").html(mealImage);

    let instructionsPart = "";
    instructionsPart += `
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>`;

    $(".instructions").html(instructionsPart);
    $(".area-value").text(`${meal.strArea}`);
    $(".category-value").text(`${meal.strCategory}`);

    // Ingredients
    let ingredients = "";
    const ingredientKeys = Object.keys(meal).filter((key) =>
        key.includes("strIngredient")
    );
    for (let i = 0; i <= ingredientKeys.length; i++) {
        let currentMeasure = `strMeasure${i + 1}`;
        const measure = meal[currentMeasure];
        const value = `${measure} ${meal[ingredientKeys[i]]}`;
        if (meal[ingredientKeys[i]]) {
            ingredients += `
                <li class="rounded">${value}</li>`;
        }
    }
    // console.log(ingredients);
    $(".ingredients").html(ingredients);

    // Tags
    const tags = meal.strTags;
    const tagsArr = tags != null ? tags.split(",") : [];
    let tagValue = "";
    for (let i = 0; i < tagsArr.length; i++) {
        tagValue += `<li class="rounded">${tagsArr[i]}</li>`;
    }
    $(".tags").html(tagValue);

    // Source Btn
    // console.log('heree meal:', meal);
    $(".source").attr("href", meal.strSource);
    // Youtube btn
    $(".youtube").attr("href", meal.strYoutube);
}

async function getCategories() {
    // alert('categories');
    // call get categories API
    const categoriesArr = await callCategoriesAPI();
    categories = categoriesArr;
    // console.log("categories:", categoriesArr);
    closeSideBar();
    // $("#all-meals-section").fadeOut(500);
    // $("#meal-recipe").fadeOut(500);

    // $("#search-section").hide();
    $("section").not('#categories-section').hide(500, function () {
        $("#categories-section").fadeIn(500);
    });
    displayCategories(categoriesArr);
}
async function callCategoriesAPI() {
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    // console.log("response:", response);
    const data = await response.json();
    // console.log("data", data);
    return data.categories;
}
function displayCategories(categoriesArr) {
    var cartona = "";
    for (let i = 0; i < categoriesArr.length; i++) {
        cartona += `       
        <div class="col-md-6 col-lg-3">
             <div class="category rounded position-relative"  onmouseenter='categorymouseenter("${[
                i,
            ]}")'
             onmouseleave='categorymouseleave("${[i]}")'
             onclick='getAllMeals("${categoriesArr[i].strCategory}")'>
                  <a href="#"><img class="w-100 rounded" src="${categoriesArr[i].strCategoryThumb
            }" alt=""></a>
                  <div class="bg-white position-absolute rounded category-layer">
                  </div>
             </div>

        </div>`;
    }
    $(".categories").html(cartona);
}
function categorymouseenter(categoryIndex) {
    $(".category-layer").eq(categoryIndex)
        .html(`<h2 class="ms-2 text-center">${categories[categoryIndex].strCategory}</h2>
        <p>${categories[categoryIndex].strCategoryDescription}</p>`);
    $(".category-layer").eq(categoryIndex).animate({ top: "0" }, 500);
}

function categorymouseleave(categoryIndex) {
    $(".category-layer").eq(categoryIndex).animate({ top: "100%" }, 500);
}
async function getAreas() {
    // call get areas API
    const areasArr = await callAreasAPI();
    areas = areasArr;
    // console.log("areas:", areasArr);
    closeSideBar();
    $("#all-meals-section").fadeOut(500);
    $("#meal-recipe").fadeOut(500);
    $("#categories-section").fadeOut(500);
    $("#areas-section").fadeIn(500);
    displayAreas(areasArr);
}
async function callAreasAPI() {
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    // console.log("response:", response);
    const data = await response.json();
    // console.log("data", data);
    return data.meals;
}
function displayAreas(areasArr) {
    var cartona = "";
    for (let i = 0; i < areasArr.length; i++) {
        cartona += `       
        <div class="col-md-6 col-lg-3">
             <div class="area rounded position-relative text-center" onclick='getAreaMeals("${areasArr[i].strArea}")'>
                  <a href="#"><i class="fa-solid fa-city fa-3x area-icon"></i></a>
                  <h3 class="text-white">${areasArr[i].strArea}</h3>
             </div>

        </div>`;
    }
    $(".areas").html(cartona);
}
async function getAreaMeals(areaValue) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaValue}`
    );
    // console.log("response:", response);
    const data = await response.json();
    // console.log("data", data);
    meals = data.meals;
    displayMeals(data.meals);
}
async function getIngredients() {
    // call get ingredients API
    const ingredientsArr = await callIngredientsAPI();
    ingredients = ingredientsArr;
    // console.log("ingredients:", ingredientsArr);
    closeSideBar();
    $("#all-meals-section").fadeOut(500);
    $("#meal-recipe").fadeOut(500);
    $("#categories-section").fadeOut(500);
    $("#areas-section").fadeOut(500);
    $("#ingredients-section").fadeIn(500);
    displayIngredients(ingredientsArr);
}
async function callIngredientsAPI() {
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    // console.log("response:", response);
    const data = await response.json();
    // console.log("data", data);
    return data.meals;
}
function displayIngredients(ingredientsArr) {
    var cartona = "";
    for (let i = 0; i < 20; i++) {
        cartona += `       
        <div class="col-md-6 col-lg-3 my-3">
             <div class="ingredient rounded text-center" onclick='getIngredientsMeals("${ingredientsArr[i].strIngredient}")'>
             <a href="#"><i class="fa-solid fa-bowl-food fa-3x ingredient-icon"></i></a>
             <h2 class="text-white text-center">${ingredientsArr[i].strIngredient}</h2>
             <p class="text-white text-center">${ingredientsArr[i].strDescription}</p>
             </div>
        </div>`;
    }
    $(".ingredients").html(cartona);
}
async function getIngredientsMeals(ingredientValue) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientValue}`
    );
    // console.log("response:", response);
    const data = await response.json();
    // console.log("data", data);
    meals = data.meals;
    displayMeals(data.meals);
}
function searchBar() {
    // console.log("search");
    $("#all-meals-section").fadeOut(500);
    $("#meal-recipe").fadeOut(500);
    $("#categories-section").fadeOut(500);
    $("#areas-section").fadeOut(500);
    $("#ingredients-section").fadeOut(500);
    closeSideBar();
    $("#search-section").fadeIn(500);
}

$(".search-name input").keyup(function (e) {
    console.log("key up name", $(this).val());
    // call search by name API
    const searchValue = $(this).val();
    if (searchValue) {
        getAllMeals($(this).val());
    } else {
        getAllMeals();
    }
});

$(".search-letter input").keyup(async function (e) {
    // console.log("key up letter");
    //www.themealdb.com/api/json/v1/1/search.php?f=a
    // call search by letter API
    const searchValue = $(this).val();
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`
    );
    // console.log("response:", response);
    const data = await response.json();
    // console.log("data", data);
    meals = data.meals;
    displayMeals(data.meals);
});
function getContactUs() {
    closeSideBar();
    $("#all-meals-section").fadeOut(500);
    $("#meal-recipe").fadeOut(500);
    $("#categories-section").fadeOut(500);
    $("#areas-section").fadeOut(500);
    $("#ingredients-section").fadeOut(500);
    $("#contact-us-section").fadeIn(500);

    // Hide All Alerts
    $("#contact-us-section input").next().css("display", "none");
}
$("#contact-us-section input").keyup(function (e) {
    const element = e.target.id;
    const elementValue = $(this).val();
    // console.log("element:", element);
    // console.log("elementValue:", elementValue);
    if (elementValue) {
        if (element == "name") {
            // Apply regex expression for name
            const nameExpression = /^[a-zA-Z ]+$/;
            const result = nameExpression.test(elementValue);
            if (!result) {
                $(this).addClass("is-invalid");
                $(this).removeClass("is-valid");
                $(this).next().css("display", "block");
            } else {
                $(this).addClass("is-valid");
                $(this).removeClass("is-invalid");
                $(this).next().css("display", "none");
            }
        } else if (element == "email") {
            // Apply regex expression for email
            // const emailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            const emailExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const result = emailExpression.test(elementValue);
            if (!result) {
                $(this).addClass("is-invalid");
                $(this).removeClass("is-valid");
                $(this).next().css("display", "block");
            } else {
                $(this).addClass("is-valid");
                $(this).removeClass("is-invalid");
                $(this).next().css("display", "none");
            }
        } else if (element == "phone") {
            // Apply regex expression for phone
            const phoneExpression = /^(002)?01[0125][0-9]{8}$/;
            const result = phoneExpression.test(elementValue);
            if (!result) {
                $(this).addClass("is-invalid");
                $(this).removeClass("is-valid");
                $(this).next().css("display", "block");
            } else {
                $(this).addClass("is-valid");
                $(this).removeClass("is-invalid");
                $(this).next().css("display", "none");
            }
        } else if (element == "age") {
            // Apply regex expression for age
            const ageExpression = /^[1-9][0-9]?$|^100$/;
            const result = ageExpression.test(elementValue);
            if (!result) {
                $(this).addClass("is-invalid");
                $(this).removeClass("is-valid");
                $(this).next().css("display", "block");
            } else {
                $(this).addClass("is-valid");
                $(this).removeClass("is-invalid");
                $(this).next().css("display", "none");
            }
        }
        if (
            $("#confirm-password").val() &&
            (element == "password" || element == "confirm-password")
        ) {
            // Apply regex expression for confirm-password
            // get password value
            const passwordValue = $("#password").val();
            console.log("passwordValue:", passwordValue);
            const confirmPassValue = $("#confirm-password").val();
            if (passwordValue != confirmPassValue) {
                $("#confirm-password").addClass("is-invalid");
                $("#confirm-password").removeClass("is-valid");
                $("#confirm-password").next().css("display", "block");
            } else {
                $("#confirm-password").addClass("is-valid");
                $("#confirm-password").removeClass("is-invalid");
                $("#confirm-password").next().css("display", "none");
            }
        }
        if (element == "password") {
            // Apply regex expression for password
            const passwordExpression = /^^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            const result = passwordExpression.test(elementValue);
            if (!result) {
                $(this).addClass("is-invalid");
                $(this).removeClass("is-valid");
                $(this).next().css("display", "block");
            } else {
                $(this).addClass("is-valid");
                $(this).removeClass("is-invalid");
                $(this).next().css("display", "none");
            }
        }
    } else {
        $(this).removeClass("is-valid");
        $(this).removeClass("is-invalid");
        $(this).next().css("display", "none");
    }
    checkButton();
});

function checkButton() {
    // console.log($("#contact-us-section input"));
    const elements = $("#contact-us-section input");
    let flag = true;
    for (let i = 0; i < elements.length; i++) {
        const element = $("#contact-us-section input").eq(i);
        // console.log("element:", element);
        const result = element.hasClass("is-invalid");
        // console.log("result", result);
        const elementVal = $("#contact-us-section input").eq(i).val();
        // console.log("element val:", $("#contact-us-section input").eq(i).val());
        if (result || !elementVal) {
            flag = false;
        }
    }
    // console.log("flag:", flag);
    if (flag) {
        $(".submit").removeClass("disabled");
    } else {
        $(".submit").addClass("disabled");
    }
}

function animateList() {
    $('.side-bar-list li').eq(0).animate({
        'opacity': "1", "top": "0px"
    }, 500, function () {
        $('.side-bar-list li').eq(1).animate({
            'opacity': "1", "top": "50px"
        }, 500, function () {
            $('.side-bar-list li').eq(2).animate({
                'opacity': "1", "top": "100px"
            }, 500, function () {
                $('.side-bar-list li').eq(3).animate({
                    'opacity': "1", "top": "150px"
                }, 500, function () {
                    $('.side-bar-list li').eq(4).animate({
                        'opacity': "1", "top": "200px"
                    }, 500)
                })
            })
        })
    })

}
function hideList() {
    $('.side-bar-list li').eq(4).animate({
        'opacity': "0", "top": "500px"
    }, 500)
    $('.side-bar-list li').eq(3).animate({
        'opacity': "0", "top": "500px"
    }, 500)
    $('.side-bar-list li').eq(2).animate({
        'opacity': "0", "top": "500px"
    }, 500)
    $('.side-bar-list li').eq(1).animate({
        'opacity': "0", "top": "500px"
    }, 500)
    $('.side-bar-list li').eq(0).animate({
        'opacity': "0", "top": "500px"
    }, 500)
}