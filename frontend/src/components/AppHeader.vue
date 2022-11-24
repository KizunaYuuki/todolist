<template >
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý Danh sách công việc </a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    Todolist
                    <i class="fa-regular fa-rectangle-list"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>