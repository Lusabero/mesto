export class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        this._dataUser = {};
        this._dataUser.userName = this._name.textContent;
        this._dataUser.userJob = this._job.textContent;

        return this._dataUser;
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}
